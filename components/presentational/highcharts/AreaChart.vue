<template>
  <div class="graph">
    <highcharts :options="chartOptions" />
  </div>
</template>

<script>
export default {
  props: {
    displayData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    yAxisData() {
      return [{ opposite: false }]
    },
    chartOptions() {
      return {
        chart: {
          height: 280,
          zoomType: 'xy',
          type: 'area',
        },
        title: {
          text: null,
        },
        xAxis: {
          min: 1990,
          max: 2020,
          scrollbar: {
            enabled: true,
          },
          crosshair: true,
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
            animation: false,
            label: {
              connectorAllowed: false,
            },
            marker: {
              enabled: false,
            },
          },
          column: {
            stacking: 'normal',
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}{point.unit}</b> <br/>',
          shared: true,
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
