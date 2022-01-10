import {
  ref,
  // computed,
  useFetch,
  useContext,
  inject,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'
// import contents from '~/assets/json/contentsSetting.json'
import { useEstatApi } from '@/composition/useEstatApi'
import {
  formatTimeChart,
  formatAdditionalDescription,
} from '@/utils/formatEstat'

interface CardState {
  canvas: boolean
  title: string
  titleId: string
  path: string
  lastUpdate: string
  loading: boolean
  chartData: []
  tableHeader: []
  tableData: []
  source: {}
  additionalDescription: []
  displayInfo: {}
}

export const useEstatTimeChart = (props) => {
  // inject
  const State = inject(StateKey)
  const {
    govType,
    code,
    statField,
    menuId,
    selectedPref,
    selectedCity,
    // routingPath,
  } = State
  // console.log({ govType, selectedPref, selectedCity })

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

  // eStat-APIからデータを取得
  const { $axios } = useContext()
  const estatResponse = ref<EstatResponse>({})
  // const formatData = ref<EstatResponse>({})
  const { fetch, fetchState } = useFetch(async () => {
    const params = Object.assign({}, props.estatParams)
    params.cdArea = code.value
    const res = await useEstatApi($axios, params).getData()
    estatResponse.value = res

    const series: EstatSeries[] = props.estatSeries
    const formatData = formatTimeChart(res, series)
    // formatData.value = formatTimeChart(res, series)
    state.chartData = formatData.chartData
    state.tableHeader = formatData.tableHeader
    state.tableData = formatData.tableData
    state.source = formatData.source
    state.displayInfo = displayInfo(formatData.chartData)
  })
  fetch()
  // console.log(formatData)

  const displayInfo = (chartData) => {
    const d = chartData[0]
    // console.log(chartData)
    const l: number = chartData[0].data.length
    return {
      lText: d.data[l - 1].y.toLocaleString(),
      sText: d.data[l - 1].x + '年の' + d.name,
      unit: d.data[l - 1].unit,
    }
  }

  const state = reactive<CardState>({
    canvas: true,
    title: _setTitle(props.cardTitle.title),
    titleId: props.cardTitle.titleId,
    route: `/${govType.value}/${code.value}/${statField.value}/${menuId.value}/${props.cardTitle.titleId}`,
    lastUpdate: _setLastUpdate(),
    loading: fetchState.pending,
    chartData: [],
    tableHeader: [],
    tableData: [],
    source: {},
    additionalDescription: formatAdditionalDescription(props.estatAnnotation)
      .timeChart,
    displayInfo: {},
  })
  return { ...toRefs(state), estatResponse }
}
