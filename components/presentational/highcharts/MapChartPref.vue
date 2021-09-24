<template>
  <div class="graph">
    <highcharts :constructor-type="'mapChart'" :options="chartOptions" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Highcharts from 'highcharts'

export default {
  props: {
    displayData: {
      type: Array,
      required: true,
    },
    yAxisData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('topojson', ['getMaps']),
    map() {
      return this.getMaps.japanMap
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
            return `${this.point.lgName}</b>:<br>${Highcharts.numberFormat(
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
        series: this.displayData,
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
