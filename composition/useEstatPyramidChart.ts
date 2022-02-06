import {
  inject,
  reactive,
  Ref,
  toRefs,
  useRoute,
} from '@nuxtjs/composition-api'
import {
  EstatTimeChart,
  EstatTableHeader,
  EstatSource,
  EstatState,
  EstatResponse,
} from '@/types/estat'
// import { useCityList } from '@/composition/useCityList'
// import { usePrefecture } from '@/composition/usePrefecture'
import { StateKey } from './useGlobalState'

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

export const useEstatPyramidChart = (
  estatState: EstatState,
  estatResponse: Ref<EstatResponse>
) => {
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
    estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  const _source = () => {
    return {
      estatName: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
      estatUrl: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
    }
  }

  const { title, titleId, series } = estatState

  const cardState = reactive<CardState>({
    title: _setTitle(title),
    titleId,
    path: `/${govType}/${code}/${statField}/${menuId}/${titleId}/`,
    chartData: _chartData(series, estatResponse.value),
    tableHeader: _tableHeader(_chartData(series, estatResponse.value)),
    tableData: _tableData(
      _chartData(series, estatResponse.value),
      _timeList(estatResponse.value)
    ),
    lastUpdate: _setLastUpdate(),
    additionalDescription: _additionalDescription(estatState.annotation),
    source: _source(),
    timeList: _timeList(estatResponse.value),
  })

  return {
    ...toRefs(cardState),
  }
}

const _chartData = (series, response) => {
  const timeList = _timeList(response)
  // const style = getGraphSeriesStyle(series.length)
  const value: VALUE[] = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  return timeList.map((d) => {
    const dataByTime = value.filter((f) => f['@time'] === d.yearStr)
    return {
      year: d.yearInt,
      data: series.map((d) => {
        const key: keyof VALUE = `@${d.id}`
        const man = dataByTime.find((f) => f[key] === d.man)
        const woman = dataByTime.find((f) => f[key] === d.woman)

        // console.log({ man, woman })
        return {
          category: d.name,
          man: parseInt(man?.$) || 0,
          woman: parseInt(woman?.$) || 0,
          unit: dataByTime[0]['@unit'],
        }
      }),
    }
  })
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

const _tableHeader = (chartData) => {
  return [
    { text: '年', value: 'year', width: '80px' },
    ...chartData.map((d) => {
      return {
        text: d.name,
        value: d.name,
        align: 'center',
        width: '100px',
      }
    }),
  ]
}

const _tableData = (chartData, timeList) => {
  return timeList.map((d) => {
    return Object.assign(
      { year: `${d.yearInt}年` },
      ...chartData.map((item) => {
        const value = item.data.find((f) => f.x === d.yearInt)
        if (value) {
          return {
            [item.name]: value.y.toLocaleString() + item.data[0].unit,
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
  // const codhCredit: string[] = ['歴史的行政区域データセットβ版（CODH作成）']

  return annotation.concat(estatCredit)
}
