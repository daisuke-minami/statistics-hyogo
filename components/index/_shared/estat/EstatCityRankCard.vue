<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :route="routingPath">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <toggle-big-city v-model="bigcityKind" />
            <toggle-map-bar v-model="mapbar" />

            <v-row>
              <v-col>
                <v-select
                  v-model="selectedSeries"
                  :items="series"
                  item-text="name"
                  item-value="name"
                  return-object
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="selectedTime"
                  :items="times"
                  item-text="yearName"
                  item-value="yearInt"
                  return-object
                  @change="$emit('input', $event)"
                />
              </v-col>
            </v-row>

            <lazy-component
              :is="chartComponent"
              v-show="canvas"
              :display-data="displayData"
              :topo-json="topoJson"
            />

            <template v-slot:description>
              <p>最終更新日：{{ lastUpdate }}</p>
              <slot name="description" />
            </template>

            <template v-slot:additionalDescription>
              <span>（注）</span>
              <ul>
                <li v-for="item in additionalDescription" :key="item">
                  {{ item }}
                </li>
              </ul>
              <slot name="additionalDescription" />
            </template>

            <template v-slot:dataTable>
              <client-only>
                <data-view-table :headers="tableHeader" :items="tableData" />
              </client-only>
            </template>

            <template v-slot:footer>
              <app-link :to="source.estatUrl">
                {{ source.estatName }}
              </app-link>
            </template>
          </data-view>
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  useFetch,
  useStore,
  PropType,
  inject,
} from '@nuxtjs/composition-api'
import {
  EstatParams,
  EstatSeries,
  EstatTimes,
  CardTitle,
  EstatResponse,
  EstatSource,
  formatCityRankChart,
  formatAdditionalDescription,
} from '@/utils/formatEstat'
import { PageStateType, PageStateKey } from '@/composition/pageState'

// MapChart
const MapChart = () => {
  return import('@/components/index/_shared/highcharts/MapChartCity.vue')
}
// BarChart
const BarChart = () => {
  return import('@/components/index/_shared/highcharts/BarChart.vue')
}

export default defineComponent({
  props: {
    cardTitle: {
      type: Object as PropType<CardTitle>,
      required: true,
    },
    estatParams: {
      type: Object as PropType<EstatParams>,
      required: true,
    },
    estatSeries: {
      type: Array as PropType<EstatSeries[]>,
      required: true,
    },
    estatLatestYear: {
      type: Object as PropType<EstatTimes>,
      required: true,
    },
    estatAnnotation: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props, context) {
    // canvas
    const canvas = ref<boolean>(true)

    // inject
    const pageState: PageStateType = inject(PageStateKey)
    // const code = pageState.code.value
    const govType = pageState.govType.value
    const selectedPref = pageState.selectedPref.value
    const selectedCity = pageState.selectedCity.value
    const cityList = pageState.cityList.value

    // card情報の設定
    const title = computed((): string => {
      const name: string =
        govType === 'prefecture' ? selectedPref.prefName : selectedCity.cityName
      return `${name}の${props.cardTitle.title}Rank`
    })
    const titleId = computed((): string => {
      return `${props.cardTitle.titleId}`
    })
    const routingPath = computed((): string => {
      return `/${pageState.routingPath.value}/${titleId.value}/`
    })

    // 政令市統合/分割
    const bigcityKind = ref<string>('all')
    const innerCityList = computed((): City[] => {
      if (bigcityKind.value === 'all') {
        return cityList.filter((f) => f.bigCityFlag !== '1')
      } else {
        return cityList.filter((f) => f.bigCityFlag !== '2')
      }
    })

    // eStat-APIからデータを取得
    const estatResponse = ref<EstatResponse>({})
    const { fetch } = useFetch(async () => {
      const params = Object.assign({}, props.estatParams)
      const series = selectedSeries.value
      if (series.id === 'cat01') {
        params.cdCat01 = series.code
      }
      params.cdArea = innerCityList.value.map((d: City) => d.cityCode)
      const { data: res } = await context.root.$estat.get(
        `${process.env.BASE_URL}/json/getStatsData`,
        { params }
      )

      estatResponse.value = res
    })

    // 系列セレクト
    const series = props.estatSeries
    const selectedSeries = ref<EstatSeries>(series[0])

    // fetch
    fetch()
    watch(selectedSeries, () => fetch())
    watch(bigcityKind, () => fetch())

    // データの整形
    const formatData = computed(() => {
      return formatCityRankChart(
        estatResponse.value,
        selectedSeries.value,
        innerCityList.value
      )
    })

    // 年次セレクト
    const times = computed((): EstatTimes[] => {
      return formatData.value.times
    })
    const selectedTime = ref<EstatTimes>(props.estatLatestYear)

    // 年次で表示データを切替
    const displayData = computed((): EstatSeries[] => {
      const c: EstatSeries[] = formatData.value.chartData
      return c.filter((f) => f.year === selectedTime.value.yearInt)
    })

    // ストアからtopojsonを取得
    const store = useStore()
    const topoJson = computed(() =>
      store.getters['topojson/getMapCity'](bigcityKind.value)
    )
    // watch(bigcityKind, () => fetch())

    // MapChartとBarChartの切替
    const mapbar = ref<string>('map')
    const chartComponent = computed((): string => {
      const chartComponent = mapbar.value === 'map' ? MapChart : BarChart
      return chartComponent
    })

    // テーブルの設定
    const tableHeader = computed(() => {
      return formatData.value.tableHeader
    })
    const tableData = computed(() => {
      return formatData.value.tableData
    })

    // 出典
    const source = computed((): EstatSource => {
      return formatData.value.source
    })

    const lastUpdate = computed((): string => {
      if (process.browser) {
        const day = new Date(document.lastModified)
        return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
      } else {
        return ''
      }
    })

    // 注釈
    const additionalDescription = computed((): string[] => {
      return formatAdditionalDescription(props.estatAnnotation).rankChart
    })

    // returnはアルファベット順
    return {
      additionalDescription,
      bigcityKind,
      canvas,
      title,
      titleId,
      routingPath,
      chartComponent,
      displayData,
      lastUpdate,
      mapbar,
      selectedSeries,
      selectedTime,
      series,
      source,
      tableData,
      tableHeader,
      times,
      topoJson,
    }
  },
})
</script>
