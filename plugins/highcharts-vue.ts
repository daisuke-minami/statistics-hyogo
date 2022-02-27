import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import exportingInit from 'highcharts/modules/exporting'
import exportingCSV from 'highcharts/modules/export-data'
import HighchartsMapModule from 'highcharts/modules/map'

Vue.use(HighchartsVue)

if (typeof Highcharts === 'object') {
  exportingInit(Highcharts)
  exportingCSV(Highcharts)
  HighchartsMapModule(Highcharts)

  Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ',',
      numericSymbols: ['千', '百万', '十億', '兆', '千兆', '百京'],
    },
  })
  stockInit(Highcharts)
}
