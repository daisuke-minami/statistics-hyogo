<template>
  <data-view :title="title" :route="path">
    <h4 :id="titleId" class="visually-hidden">
      {{ title }}
    </h4>

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
import { useEstatRankChart } from '@/composition/useEstatRankChart'
import { EstatSeries, EstatState, EstatTimes } from '~/types/estat'

// MapChart
const MapChart = () => {
  return import('@/components/index/_shared/highcharts/MapChartPref.vue')
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
    prefMap: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // canvas
    const canvas = true

    // console.log({ props })
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
    } = useEstatRankChart(props.estatState)

    // console.log(tableData)

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

    // console.log({ chartData, displayData })

    // MapChartとBarChartの切替
    const mapbar = ref<string>('map')
    const chartComponent = computed(() => {
      return mapbar.value === 'map' ? MapChart : BarChart
    })

    const geoJson = props.prefMap

    // returnはアルファベット順
    return {
      additionalDescription,
      canvas,
      title,
      titleId,
      path,
      timeList,
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
      geoJson,
    }
  },
})
</script>
