<template>
  <div class="graph">
    <highcharts :options="chartOptions" />
  </div>
</template>

<script>
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
    chartOptions() {
      return {
        chart: {
          height: 400,
          plotShadow: false,
          type: 'bar',
        },
        title: {
          text: null,
        },
        xAxis: {
          type: 'category',
          min: 0,
          max: 10,
          scrollbar: {
            enabled: true,
          },
        },
        yAxis: this.yAxisData.map((item) => ({
          max: item.max,
          min: item.min,
          opposite: item.opposite,
          title: {
            text: '',
          },
          labels: {
            formatter() {
              return this.value.toLocaleString()
            },
          },
        })),
        plotOptions: {
          series: {
            stacking: 'normal',
          },
          bar: {
            pointWidth: 20,
            pointPadding: 0,
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          formatter() {
            return `${this.point.name}</b>:<br>${Highcharts.numberFormat(
              this.point.y,
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
