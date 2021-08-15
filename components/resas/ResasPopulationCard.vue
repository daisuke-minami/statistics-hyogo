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

            <template v-slot:button>
              <data-selector-break
                v-model="dataKind"
                :target-id="chartConfig.titleId"
                :style="{ display: canvas ? 'inline-block' : 'none' }"
              />
            </template>

            <line-chart
              v-show="canvas"
              :display-data="displayData"
              :y-axis-data="yAxisData"
            />

            <template v-slot:additionalDescription>
              <span>（注）</span>
              <ul>
                <li>2015年までは実績値、それ以降は将来推計人口</li>
              </ul>
              <slot name="additionalDescription" />
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
// import { mapGetters } from 'vuex'

export default {
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataKind: 'all',
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
    yAxisData() {
      return this.chartData.map((item) => ({
        max: item.max,
        min: item.min,
        opposite: item.opposite,
      }))
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
      }
    },
    displayData() {
      if (this.dataKind === 'all') {
        return this.chartData.filter((item) => item.name === '総人口')
      } else {
        return this.chartData.filter((item) => item.name !== '総人口')
      }
    },
  },
  watch: {
    resasParam() {
      this.setChartData()
    },
  },
  created() {
    this.setChartData()
  },
  methods: {
    async setChartData() {
      const res = await this.$getResasAPI(this.resasUrl, this.resasParam)
      this.chartData = res.data.map((item) => {
        return {
          name: item.label,
          data: item.data.map((d) => {
            return {
              x: d.year,
              y: d.value,
            }
          }),
        }
      })
    },
  },
}
</script>
