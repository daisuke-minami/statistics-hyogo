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
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      //   charWidth: 300,
      //   windowWidth: 0,
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'bar',
          backgroundColor: 'transparent',
        },
        title: {
          text: null,
        },
        accessibility: {
          point: {
            valueDescriptionFormat: '{index}. {xDescription}, {value}.',
          },
        },
        xAxis: [
          {
            // 左軸
            categories: this.categories,
            reversed: false,
            labels: {
              step: 1,
            },
            accessibility: {
              description: '年齢（男性）',
            },
          },
          {
            // 右軸
            opposite: true,
            reversed: false,
            categories: this.categories,
            linkedTo: 0,
            labels: {
              step: 1,
            },
            accessibility: {
              description: '年齢（女性）',
            },
          },
        ],
        yAxis: {
          title: {
            text: null,
          },
          labels: {
            formatter() {
              return this.value.toLocaleString()
            },
          },
        },
        plotOptions: {
          series: {
            animation: false,
            stacking: 'normal',
          },
        },
        responsive: {
          rules: [
            {
              condition: {
                maxheight: 350,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'right',
                  verticalAlign: 'top',
                },
              },
            },
          ],
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          useHTML: true,
          formatter() {
            return this.points.map((point) => {
              return `
                <i style="
                  background-color:${point.color};
                  border-radius:50%;
                  display: inline-block;
                  height:6px;
                  margin-right:4px;
                  width:6px;"
                ></i>${point.series.name}: <b>${Math.abs(
                point.y
              ).toLocaleString()}</b><br>`
            })
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
