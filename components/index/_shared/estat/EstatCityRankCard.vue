<template>
  <data-view :title="title" :route="path">
    <h4 :id="titleId" class="visually-hidden">
      {{ title }}
    </h4>

    <toggle-big-city />
    <toggle-map-bar v-model="mapbar" />

    <v-row>
      <v-col>
        <select-series :series="series" />
      </v-col>
      <v-col>
        <v-select
          v-model="selectedTime"
          :items="timeList"
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
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  PropType,
} from '@nuxtjs/composition-api'

import { useEstatCityRankChart } from '@/composition/useEstatCityRankChart'
import { EstatState } from '~/types/estat'

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
    cityMap: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // canvas
    const canvas = true

    const {
      title,
      titleId,
      path,
      timeList,
      chartData,
      tableHeader,
      tableData,
      source,
      lastUpdate,
      additionalDescription,
    } = useEstatCityRankChart(props.estatState)

    // 政令市統合/分割
    const bigcityKind = ref<string>('all')

    const geoJson = ref<object>(props.cityMap.all)

    // 系列セレクト
    const series = props.estatState.series
    const selectedSeries = ref<EstatSeries>(series[0])

    // 年次セレクト
    const selectedTime = ref<EstatTimes>(props.estatState.latestYear)

    // 年次で表示データを切替
    const displayData = computed((): EstatSeries[] => {
      const c = chartData.value

      return c
        .filter((f) => f.year === selectedTime.value.yearInt)
        .filter((f) => f.name === selectedSeries.value.name)
    })

    // MapChartとBarChartの切替
    const mapbar = ref<string>('map')
    const chartComponent = computed((): string => {
      return mapbar.value === 'map' ? MapChart : BarChart
    })

    // returnはアルファベット順
    return {
      additionalDescription,
      bigcityKind,
      canvas,
      title,
      titleId,
      path,
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
      timeList,
      geoJson,
    }
  },
})
</script>
