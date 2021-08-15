<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card>
          <data-view
            :title="chartConfig.graphTitle"
            :title-id="chartConfig.titleId"
          >
            <h4 :id="chartConfig.graphId" class="visually-hidden">
              {{ chartConfig.graphTitle }}
            </h4>

            <pyramid-chart
              v-show="canvas"
              :display-data="displayData"
              :categories="categories"
            />

            <template v-slot:slider>
              <data-slider v-model="year" :target-id="chartConfig.titleId" />
            </template>

            <template v-slot:additionalDescription>
              <span>（注）</span>
              <ul>
                <li>2015年までは実績値、それ以降は将来推計人口</li>
              </ul>
              <slot name="additionalDescription" />
            </template>

            <template v-slot:dataTable>
              <client-only>
                <data-view-table :headers="tableHeaders" :items="tableData" />
              </client-only>
            </template>

            <template v-slot:footer>
              <app-link :to="chartConfig.docURL">
                地域経済分析システムRESAS
              </app-link>
            </template>
          </data-view>
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script>
export default {
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      year: 2015,
      canvas: true,
      chartData: [],
    }
  },
  computed: {
    cdArea() {
      if (!this.$route.params.codes) {
        return this.cityCode
      } else {
        return this.$route.params.codes
      }
    },
    chartConfig() {
      return this.$getResasChartConfig(this.titleId, this.cdArea, this.isPref)
    },
    resasUrl() {
      return this.chartConfig.apiURL
    },
    resasParam() {
      const cityCode = () => {
        if (this.cdArea.slice(-3) === '000') {
          return '-'
        } else {
          return this.cdArea
        }
      }

      return {
        prefCode: process.env.PREF_CODE,
        cityCode: cityCode(),
        yearLeft: String(this.year),
        yearRight: '2040',
      }
    },
    categories() {
      return this.chartData.map((d) => d.class)
    },
    displayData() {
      return [
        {
          name: '男性',
          data: this.chartData.map((d) => -1 * d.man),
          color: '#4169e1',
        },
        {
          name: '女性',
          data: this.chartData.map((d) => d.woman),
          color: '#ff69b4',
        },
      ]
    },
    tableHeaders() {
      return [
        { text: '年齢区分', value: 'class', align: 'end' },
        { text: '男性', value: 'man', align: 'end' },
        { text: '男性割合', value: 'manPercent', align: 'end' },
        { text: '女性', value: 'woman', align: 'end' },
        { text: '女性割合', value: 'womanPercent', align: 'end' },
      ]
    },
    tableData() {
      return this.chartData.map((item) => {
        return {
          class: item.class,
          man: item.man.toLocaleString() + '人',
          manPercent: item.manPercent + '％',
          woman: item.woman.toLocaleString() + '人',
          womanPercent: item.womanPercent + '％',
        }
      })
    },
  },
  watch: {
    resasParam() {
      this.setChartData()
    },
  },
  mounted() {
    this.setChartData()
  },
  methods: {
    async setChartData() {
      const res = await this.$getResasAPI(this.resasUrl, this.resasParam)
      this.chartData = res.yearLeft.data
    },
  },
}
</script>
