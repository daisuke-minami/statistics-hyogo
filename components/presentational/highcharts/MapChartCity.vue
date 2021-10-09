<template>
  <div class="graph">
    <highcharts :constructor-type="'mapChart'" :options="chartOptions" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Highcharts from 'highcharts'
import { cloneDeep } from 'lodash'

export default {
  props: {
    displayData: {
      type: Array,
      required: true,
    },
    bigcityKind: {
      type: String,
      default: 'all',
    },
    // yAxisData: {
    //   type: Array,
    //   required: true,
    // },
  },
  computed: {
    ...mapGetters('topojson', ['getMaps']),
    series() {
      const series = cloneDeep(this.displayData)
      series[0].joinBy = ['N03_007', 'cityCode']
      series[0].states = { hover: { color: '#a4edba' } }
      return series
    },
    map() {
      if (this.bigcityKind === 'all') {
        return this.getMaps.prefMapDc
      } else {
        return this.getMaps.prefMap
      }
    },
    chartOptions() {
      return {
        chart: {
          map: this.map,
        },
        title: {
          text: null,
        },
        mapNavigation: {
          enabled: false,
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
            return `${this.point.cityName}</b>:<br>${Highcharts.numberFormat(
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
