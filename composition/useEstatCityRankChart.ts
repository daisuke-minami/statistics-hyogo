import { inject, reactive, toRefs, useRoute } from '@nuxtjs/composition-api'
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
import { useCityList } from '@/composition/useCityList'
import { usePrefecture } from '@/composition/usePrefecture'
import { StateKey } from './useGlobalState'
// import { BigCityKind, useBigCity } from '@/composition/useBigCity'

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

export const useEstatCityRankChart = (estatState: EstatState) => {
  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { govType, code, statField, menuId } = params

  // 都道府県・市区町村
  const { currentPref, currentCity } = inject(StateKey)

  const _setTitle = (title: string) => {
    const name: string =
      govType === 'prefecture'
        ? currentPref.value.prefName
        : currentCity.value.cityName
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
      return {
        year: d.yearInt,
        data: _getCityListValues(timeValue),
      }
    })
  }

  /**
   * estat-APIの結果を都道府県別にまとめて返却
   * @param value - estat-APIのレスポンス GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
   */
  const _getCityListValues = (value: VALUE[]) => {
    const { cityListAll } = useCityList()
    return cityListAll.value.map((d) => {
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
    path: `/${govType}/${code}/${statField}/${menuId}/${titleId}/`,
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

/**
 * estat-APIの結果からTime（年次）一覧を返却
 * @param response - estat-APIのレスポンス
 * @returns yearInt:2020,yearStr:20200000,yearName:2020年
 */
const _timeList = (response: EstatResponse) => {
  const value: VALUE[] = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  const times = Array.from(new Set(value.map((d) => d['@time']))).map((d) => {
    return {
      yearInt: parseInt(d.substring(0, 4)),
      yearStr: d,
      yearName: `${d.substring(0, 4)}年`,
    }
  })

  // 降順にソート
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
