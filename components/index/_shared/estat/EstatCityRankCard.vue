<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :route="path">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <toggle-big-city v-model="selectedBigCityKind" />
            <toggle-rank-value v-model="selectedValueType" />
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
              v-show="true"
              :display-data="displayData"
              :geo-json="geoJson"
            />

            <template v-slot:description>
              <p>最終更新日:{{ lastUpdate }}</p>
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
  PropType,
  reactive,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { useEstatCityRankChart } from '@/composition/useEstatCityRankChart'
import { useEstatApi } from '@/composition/useEstatApi'
import { useGeojson } from '@/composition/useGeojson'
import { useCityList } from '@/composition/useCityList'
import { useTotalPopulation } from '@/composition/useTotalPopulation'
import {
  EstatResponse,
  EstatSeries,
  EstatState,
  EstatTimes,
} from '~/types/estat'

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
    estatState: {
      type: Object as PropType<EstatState>,
      required: true,
    },
  },
  setup(props) {
    // 市区町村リスト
    const { getCityList } = useCityList()
    const cityList = getCityList('all')

    // geoJson
    const cityMap = reactive<any>({ all: null, break: null })

    // 総人口
    const totalPopulationData = ref<any>()
    const estatResponse = ref<EstatResponse>()

    const { $axios } = useContext()
    const { fetch } = useFetch(async () => {
      // estat-APIの取得
      const params = Object.assign({}, props.estatState.params)

      params.cdArea = cityList.value.map((d) => d.cityCode)
      estatResponse.value = await useEstatApi($axios, params).getData()

      // geojsonの取得
      cityMap.all = await useGeojson($axios).cityMapAll.value
      cityMap.break = await useGeojson($axios).cityMapBreak.value

      totalPopulationData.value = await useTotalPopulation($axios).getCity(
        cityList
      )
    })
    fetch()

    // 政令市統合/分割
    const selectedBigCityKind = ref<string>('join')

    // 系列セレクト
    const series = props.estatState.series
    const selectedSeries = ref<EstatSeries>(series[0])

    // 年次セレクト
    const selectedTime = ref<EstatTimes>(props.estatState.latestYear)

    // 総数or単位人口or単位面積
    const selectedValueType = ref<string>('all')

    const {
      title,
      titleId,
      path,
      times,
      tableHeader,
      tableData,
      source,
      lastUpdate,
      additionalDescription,
      displayData,
    } = useEstatCityRankChart(
      props.estatState,
      estatResponse,
      selectedSeries,
      selectedTime,
      selectedBigCityKind,
      selectedValueType,
      totalPopulationData
    )

    // GeoJsonの設定
    const geoJson = computed(() => {
      return selectedBigCityKind.value === 'join' ? cityMap.all : cityMap.break
    })

    // MapChartとBarChartの切替
    const mapbar = ref<string>('map')
    const chartComponent = computed((): string => {
      return mapbar.value === 'map' ? MapChart : BarChart
    })

    // returnはアルファベット順
    return {
      series,
      additionalDescription,
      selectedBigCityKind,
      title,
      titleId,
      path,
      chartComponent,
      displayData,
      lastUpdate,
      mapbar,
      selectedSeries,
      selectedTime,
      selectedValueType,
      source,
      tableData,
      tableHeader,
      times,
      geoJson,
    }
  },
})
</script>
