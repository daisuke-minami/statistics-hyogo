<template>
  <data-view :title="title" :route="path">
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
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  PropType,
} from '@nuxtjs/composition-api'

import { useEstatCityRankChart } from '@/composition/useEstatCityRankChart'
import { EstatSeries, EstatState, EstatTimes } from '~/types/estat'

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
    totalPopulation: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
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
      selectedSeries,
      selectedTime,
      selectedBigCityKind
      // selectedValueType,
    )

    console.log(props.totalPopulation)

    // GeoJsonの設定
    const geoJson = computed(() => {
      return selectedBigCityKind.value === 'join'
        ? props.cityMap.all
        : props.cityMap.break
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
