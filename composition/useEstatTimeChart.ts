import { computed, inject, reactive, toRefs } from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'
import { getGraphSeriesStyle } from '@/utils/colors'

interface CardState {
  canvas: boolean
  title: string
  titleId: string
  path: string
  lastUpdate: string
}

export const useEstatTimeChart = (props, getRes: () => object) => {
  // inject
  const State = inject(StateKey)
  const { govType, selectedPref, selectedCity } = State

  const _setTitle = (title: string) => {
    const name: string =
      govType.value === 'prefecture'
        ? selectedPref.value.prefName
        : selectedCity.value.cityName
    return `${name}の${title}`
  }

  const _setLastUpdate = () => {
    if (process.browser) {
      const day = new Date(document.lastModified)
      return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
    } else {
      return ''
    }
  }

  const formatData = computed(() => {
    return formatTimeChart(props.estatSeries, getRes())
  })
  const chartData = computed(() => {
    return formatData.value.chartData
  })
  const displayInfo = computed(() => {
    const d: EstatSeries = formatData.value.chartData[0]
    const l: number = d.data.length
    return {
      lText: d.data[l - 1].y.toLocaleString(),
      sText: d.data[l - 1].x + '年の' + d.name,
      unit: d.data[l - 1].unit,
    }
  })
  const tableHeader = computed(() => {
    return formatData.value.tableHeader
  })
  const tableData = computed(() => {
    return formatData.value.tableData
  })
  const source = computed((): EstatSource => {
    return formatData.value.source
  })
  const additionalDescription = computed((): string[] => {
    return formatAdditionalDescription(props.estatAnnotation).timeChart
  })

  const state = reactive<CardState>({
    canvas: true,
    title: _setTitle(props.cardTitle.title),
    titleId: props.cardTitle.title,
    path: '/test',
    lastUpdate: _setLastUpdate(),
    // chartData: formatData.value.chartData,
  })

  return {
    ...toRefs(state),
    chartData,
    tableHeader,
    tableData,
    source,
    additionalDescription,
    displayInfo,
  }
}

function formatTimeChart(series, estatResponse) {
  // 色の設定
  const style = getGraphSeriesStyle(series.length)

  const value: VALUE[] =
    estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // chartData
  const chartData: TimeChart[] = series.map((d, i) => {
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

  // TimeList
  const times: EstatTimes[] = _formatTimeList(value)

  const tableHeader: EstatTableHeader[] = [
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

  const tableData: EstatTableData[] = times.map((d: EstatTimes) => {
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

  const TABLE_INF = estatResponse.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  const source = _formatSource(TABLE_INF)

  return {
    chartData,
    tableHeader,
    tableData,
    source,
  }
}

function _formatTimeList(value: VALUE[]) {
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

function _formatSource(TABLE_INF): EstatSource {
  return {
    estatName: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
    estatUrl: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
  }
}

/**
 * additionalDescription
 * @param annotation - 注釈
 */
function formatAdditionalDescription(annotation: string[]) {
  const estatCredit: string[] = [
    'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
  ]
  const codhCredit: string[] = ['歴史的行政区域データセットβ版（CODH作成）']

  return {
    timeChart: annotation.concat(estatCredit),
    rankChart: annotation.concat(estatCredit, codhCredit),
  }
}
