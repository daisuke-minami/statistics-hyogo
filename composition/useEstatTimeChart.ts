import { inject, reactive, toRefs } from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'
import { getGraphSeriesStyle } from '@/utils/colors'
import { EstatTimeChart, EstatTableHeader } from '@/types/estat'

interface CardState {
  title: string
  titleId: string
  path: string
  chartData: EstatTimeChart[]
  tableHeader: EstatTableHeader[]
  tableData: []
}

export const useEstatTimeChart = (estatState) => {
  // inject
  const State = inject(StateKey)
  const { govType, routingPath, selectedPref, selectedCity } = State

  const _setTitle = () => {
    const name: string =
      govType.value === 'prefecture'
        ? selectedPref.value.prefName
        : selectedCity.value.cityName
    return `${name}の${estatState.title}`
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

  const cardState = reactive<CardState>({
    title: _setTitle(title),
    titleId,
    path: `${routingPath.value}/${titleId}/`,
    chartData: _chartData(series, response),
    tableHeader: _tableHeader(_chartData(series, response)),
    tableData: _tableData(_chartData(series, response)),
    lastUpdate: _setLastUpdate(),
    additionalDescription: _additionalDescription(estatState.annotation),
    source: _source(),
  })

  // const set = (estatState): void => {}

  return {
    ...toRefs(cardState),
    // set,
  }
}

const _chartData = (series, response) => {
  const style = getGraphSeriesStyle(series.length)
  const value: VALUE[] = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  return series.map((d, i) => {
    const key: keyof VALUE = `@${d.id}`
    return {
      name: d.name,
      data: value
        .filter((f) => f[key] === d.code)
        .map((d) => {
          return {
            x: parseInt(d['@time'].substr(0, 4)),
            y: parseFloat(d.$),
            unit: d['@unit'],
          }
        }),
      color: style[i].color,
      yAxis: d.yAxis,
      type: d.type,
    }
  })
}

const _tableHeader = (chartData) => {
  // console.log(chartData)
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

const _tableData = (chartData) => {
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
