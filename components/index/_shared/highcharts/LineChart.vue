<template>
  <div class="graph">
    <highcharts :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'

type Series = {
  name: string
  data: {
    x: number
    y: number
    unit: string
  }
  color: string
}
type Props = {
  displaydata: Series[]
}

export default defineComponent({
  props: {
    displayData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const series = computed((): Series[] => {
      return cloneDeep(props.displayData)
    })
    const chartOptions = computed(() => {
      return {
        chart: {
          height: 280,
          zoomType: 'xy',
          type: 'line',
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
        yAxis: {
          opposite: true,
          title: {
            text: '',
          },
        },
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
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}{point.unit}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
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
