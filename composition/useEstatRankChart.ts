import { inject, reactive, toRefs } from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'
import {
  EstatTableHeader,
  EstatSource,
  EstatState,
  VALUE,
  EstatTimes,
  EstatSeries,
  EstatResponse,
  EstatTimeChart,
} from '@/types/estat'
import { useCity } from '@/composition/useCity'
import { usePrefecture } from '@/composition/usePrefecture'

interface CardState {
  title: string
  titleId: string
  path: string
  chartData: EstatTimeChart[]
  tableHeader: EstatTableHeader[]
  tableData: []
  lastUpdate: string
  additionalDescription: string[]
  source: EstatSource
}

export const useEstatRankChart = (estatState: EstatState) => {
  // inject
  const State = inject(StateKey)
  const { govType, routingPath } = State

  // 都道府県・市区町村
  const { selectedPref } = usePrefecture()
  const { selectedCity } = useCity()

  const _setTitle = (title: string) => {
    const name: string =
      govType.value === 'prefecture'
        ? selectedPref.value.prefName
        : selectedCity.value.cityName
    return `${name}の${title}`
  }

  // 出典
  const TABLE_INF =
    estatState.response.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  const _source = () => {
    return {
      estatName: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
      estatUrl: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
    }
  }

  const { title, titleId, series, response } = estatState

  const _chartData = (series: EstatSeries[], response: EstatResponse) => {
    const timeList = _timeList(response)
    const value: VALUE[] =
      response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

    return series.reduce((pre, cur) => {
      const key: keyof VALUE = `@${cur.id}`
      const v = value.filter((f) => f[key] === cur.code)

      const arr = _getTimeListValues(timeList, v).map((d) => {
        return {
          name: cur.name,
          year: d.year,
          data: d.data,
        }
      })
      pre.push(...arr)
      return pre
    }, [])
  }

  const _getTimeListValues = (timeList: EstatTimes[], value: VALUE[]) => {
    return timeList.map((d) => {
      const timeValue = value.filter((f) => f['@time'] === d.yearStr)
      if (govType.value === 'prefecture') {
        return {
          year: d.yearInt,
          data: _getPrefListValues(timeValue),
        }
      } else {
        return {
          year: d.yearInt,
          data: _getCityListValues(timeValue),
        }
      }
    })
  }

  /**
   * estat-APIの結果を都道府県別にまとめて返却
   * @param value - estat-APIのレスポンス GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
   */
  const _getPrefListValues = (value: VALUE[]) => {
    const { prefList } = usePrefecture()
    return prefList.value.map((d) => {
      const cdArea = ('0000000000' + d.prefCode).slice(-2) + '000'
      const data = value.find((f) => f['@area'] === cdArea)
      if (data) {
        return {
          prefCode: cdArea,
          prefName: d.prefName,
          value: parseInt(data.$),
          unit: data['@unit'],
        }
      } else {
        return {
          prefCode: cdArea,
          prefName: 'test',
          value: '',
          unit: '',
        }
      }
    })
  }

  /**
   * estat-APIの結果を都道府県別にまとめて返却
   * @param value - estat-APIのレスポンス GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
   */
  const _getCityListValues = (value: VALUE[]) => {
    const { cityList } = useCity()
    return cityList.value.map((d) => {
      const data = value.find((f) => f['@area'] === d.cityCode)
      if (data) {
        return {
          cityCode: d.cityCode,
          cityName: d.cityName,
          value: parseInt(data.$),
          unit: data['@unit'],
        }
      } else {
        return {
          cityCode: d.cityCode,
          cityName: d.cityName,
          value: '',
          unit: '',
        }
      }
    })
  }

  const cardState = reactive<CardState>({
    title: _setTitle(title),
    titleId,
    path: `${routingPath.value}/${titleId}/`,
    timeList: _timeList(response),
    chartData: _chartData(series, response),
    tableHeader: _tableHeader(_timeList(response)),
    tableData: _tableData(_chartData(series, response), _timeList(response)),
    lastUpdate: _setLastUpdate(),
    additionalDescription: _additionalDescription(estatState.annotation),
    source: _source(),
  })

  return {
    ...toRefs(cardState),
  }
}

const _timeList = (response) => {
  const value: VALUE[] = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  const times = Array.from(new Set(value.map((d) => d['@time']))).map((d) => {
    return {
      yearInt: parseInt(d.substr(0, 4)),
      yearStr: d,
      yearName: `${d.substr(0, 4)}年`,
    }
  })

  return times.sort((a, b) => {
    if (a.yearStr > b.yearStr) return -1
    if (a.yearStr < b.yearStr) return 1
    return 0
  })
}

const _tableHeader = (timeList: EstatTimes[]) => [
  { text: '都道府県名', value: 'prefName', width: '80px' },
  ...timeList.map((d) => {
    return {
      text: `${d.yearInt}年`,
      value: `${d.yearInt}年`,
      align: 'center',
      width: '100px',
    }
  }),
]

const _tableData = (chartData) => {
  const { prefList } = usePrefecture()
  return prefList.value.map((d) => {
    const cdArea = ('0000000000' + d.prefCode).slice(-2) + '000'
    return Object.assign(
      { prefName: d.prefName },
      ...chartData.map((d) => {
        const data = d.data.find((f) => f.prefCode === cdArea)
        const year = `${d.year}年`
        if (data) {
          return {
            [year]: data.value.toLocaleString() + data.unit,
          }
        } else {
          return ''
        }
      })
    )
  })
}

const _setLastUpdate = () => {
  if (process.browser) {
    const day = new Date(document.lastModified)
    return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
  } else {
    return ''
  }
}

const _additionalDescription = (annotation: string[]) => {
  const estatCredit: string[] = [
    'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
  ]
  const codhCredit: string[] = ['歴史的行政区域データセットβ版（CODH作成）']

  return annotation.concat(estatCredit, codhCredit)
}
