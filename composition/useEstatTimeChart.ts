import { computed, inject, Ref, useRoute } from '@nuxtjs/composition-api'
import { getGraphSeriesStyle } from '@/utils/colors'
import { EstatState, EstatResponse, VALUE } from '@/types/estat'
import {
  formatEstatTimeList,
  formatEstatSource,
} from '@/composition/utils/formatEstat'
import { GlobalState, StateKey } from './useGlobalState'

export const useEstatTimeChart = (
  estatState: EstatState,
  estatResponse: Ref<EstatResponse>
) => {
  // title
  const { getTitle } = inject(StateKey) as GlobalState
  const title = computed(() => {
    return getTitle(estatState.title)
  })

  // titleId
  const titleId = estatState.titleId

  // path
  const route = useRoute()
  const path = computed(() => {
    return `${route.value.path}/${titleId}/`
  })

  // times
  const times = computed(() => {
    return formatEstatTimeList(estatResponse.value)
  })

  // chartData
  const chartData = computed(() => {
    const style = getGraphSeriesStyle(estatState.series.length)
    const value: VALUE[] =
      estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
    return estatState.series.map((d, i) => {
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
  })

  const tableHeader = computed(() => {
    return [
      { text: '年', value: 'year', width: '80px' },
      ...chartData.value.map((d) => {
        return {
          text: d.name,
          value: d.name,
          align: 'center',
          width: '100px',
        }
      }),
    ]
  })

  const tableData = computed(() => {
    return times.value.map((d) => {
      return Object.assign(
        { year: `${d.yearInt}年` },
        ...chartData.value.map((item) => {
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
  })

  // 注釈
  const additionalDescription = computed(() => {
    const estatCredit: string[] = [
      'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
    ]

    return estatState.annotation.concat(estatCredit)
  })

  // 出典
  const source = computed(() => {
    return formatEstatSource(estatResponse.value)
  })

  // 最終更新日
  const lastUpdate = computed(() => {
    if (process.browser) {
      const day = new Date(document.lastModified)
      return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
    } else {
      return ''
    }
  })

  return {
    title,
    titleId,
    path,
    chartData,
    tableHeader,
    tableData,
    source,
    lastUpdate,
    additionalDescription,
  }
}
