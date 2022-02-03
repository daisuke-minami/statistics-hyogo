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
  },
  computed: {
    series() {
      return this.displayData.map((d) => {
        return {
          dataSorting: { enabled: true },
          data: d.data.map((d) => {
            if (d.cityName) {
              return {
                name: d.cityName,
                y: d.value,
                unit: d.unit,
              }
            } else {
              return {
                name: d.prefName,
                y: d.value,
                unit: d.unit,
              }
            }
          }),
        }
      })
    },
    values() {
      return this.series[0].data.map((d) => d.y)
    },
    max() {
      return Math.max(...this.values)
    },
    min() {
      return Math.min(...this.values)
    },
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
        yAxis: {
          opposite: false,
          max: this.max,
          min: this.min,
          title: {
            text: '',
          },
          labels: {
            formatter() {
              return this.value.toLocaleString()
            },
          },
        },
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
              2,
              '.',
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
