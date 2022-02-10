<template>
  <div class="graph">
    <highcharts :constructor-type="'mapChart'" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { FeatureCollection } from 'geojson'
import { cloneDeep } from 'lodash'

type SeriesRankCity = {
  name: string
  year: number
  data: {
    cityCode: string
    cityName: string
    value: number
    unit: string
  }
  joinBy: string[]
  states: object
}

export default defineComponent({
  props: {
    displayData: {
      type: Array as () => SeriesRankCity[],
      required: true,
    },
    geoJson: {
      type: Object as PropType<FeatureCollection>,
      required: true,
    },
  },
  setup(props) {
    const series = computed(() => {
      const series: SeriesRankCity[] = cloneDeep(props.displayData)
      series[0].joinBy = ['N03_007', 'cityCode']
      series[0].states = { hover: { color: '#a4edba' } }
      return series
    })
    const chartOptions = computed(() => {
      return {
        chart: {
          map: props.geoJson,
        },
        title: {
          text: null,
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox',
          },
        },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'bottom',
        },
        colorAxis: {
          min: 0,
          max: props.displayData[0].max,
        },
        tooltip: {
          pointFormat:
            '<span>{point.cityName}</span>: <b>{point.value}{point.unit}</b><br/> （県内第{point.rank}位）',
        },
        credits: {
          enabled: false,
        },
        series: series.value,
      }
    })
    return {
      chartOptions,
    }
  },
})
</script>

<style lang="sass" scoped>
.graph
  margin-top: 10px
  height: 100%
</style>
