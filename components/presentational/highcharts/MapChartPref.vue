<template>
  <div class="graph">
    <highcharts :constructor-type="'mapChart'" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import * as topojson from 'topojson-client'
// import Highcharts from 'highcharts'

export default defineComponent({
  props: {
    displayData: {
      type: Array,
      required: true,
    },
    topoJson: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const series = computed(() => {
      const series = cloneDeep(props.displayData)
      series[0].joinBy = ['N03_001', 'prefName']
      series[0].states = { hover: { color: '#a4edba' } }
      // console.log(series)
      return series
    })
    const geoJson = computed(() => {
      return topojson.feature(props.topoJson, props.topoJson.objects.pref)
    })
    const chartOptions = computed(() => {
      return {
        chart: {
          map: geoJson.value,
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
            '<span style="color:{series.color}">{point.prefName}</span>: <b>{point.value}{point.unit}</b><br/>',
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
