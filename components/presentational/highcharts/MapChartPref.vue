<template>
  <div class="graph">
    <highcharts :constructor-type="'mapChart'" :options="chartOptions" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import * as topojson from 'topojson-client'
import Highcharts from 'highcharts'

export default {
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
  computed: {
    series() {
      const series = cloneDeep(this.displayData)
      series[0].joinBy = ['N03_001', 'prefName']
      series[0].states = { hover: { color: '#a4edba' } }
      return series
    },
    geoJson() {
      return topojson.feature(this.topoJson, this.topoJson.objects.pref)
    },
    chartOptions() {
      return {
        chart: {
          map: this.geoJson,
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
          max: this.displayData[0].max,
        },
        tooltip: {
          formatter() {
            return `${this.point.prefName}</b>:<br>${Highcharts.numberFormat(
              this.point.value,
              0,
              '',
              ','
            )} ${this.point.unit}`
          },
        },
        credits: {
          enabled: false,
        },
        series: this.series,
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.graph
  margin-top: 10px
  height: 100%
</style>
