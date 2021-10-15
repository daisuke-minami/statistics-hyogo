<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending" class="DataView">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :route="route">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <template v-slot:infoPanel>
              <data-view-data-set-panel :display-info="displayInfo" />
            </template>

            <template v-if="isSelector" v-slot:button>
              <toggle-break
                v-model="dataKind"
                :target-id="contents.titleId"
                :style="{ display: canvas ? 'inline-block' : 'none' }"
              />
            </template>

            <component
              :is="chartComponent"
              v-show="canvas"
              :display-data="displayData"
            />

            <template v-slot:description>
              <p>最終更新日：{{ lastUpdate }}</p>
              <slot name="description" />
            </template>

            <template v-slot:additionalDescription>
              <span>（注）</span>
              <ul>
                <li v-for="item in additionalDescription" :key="item">
                  {{ item }}
                </li>
              </ul>
              <slot name="additionalDescription" />
            </template>

            <template v-slot:dataTable>
              <client-only>
                <data-view-table :headers="tableHeaders" :items="tableData" />
              </client-only>
            </template>

            <template v-slot:footer>
              <app-link :to="statUrl"> {{ statName }} </app-link>
            </template>
          </data-view>
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
// import { cloneDeep } from 'lodash'

type Computed = {
  title: () => string
  titleId: () => string
  additionalDescription: () => string
  routes: () => string
  docURL: () => string
  chartData: () => void
  displayData: () => void
  yAxisData: () => void
}

type Methods = {}

type Props = {
  contents: object
}

const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  props: {
    contents: {
      type: Object,
      required: true,
    },
    // json: {
    //   // type: Module,
    //   default: null,
    // },
  },
  // APIから取得する場合
  // async fetch() {
  //   const params = this.contents.estatParams
  //   params.cdArea = this.cdArea
  //   this.estatResponse = await this.$getEstatAPI(params)
  // },
  // JSONから取得する場合
  async fetch() {
    const res = await import(
      `~/static/pagecontents/${this.statisticsClass}/${this.governmentType}/${this.titleId}.json`
    )
    // params.cdArea = this.cdArea
    this.estatResponse = res
  },
  data() {
    return {
      canvas: true,
      dataKind: 'all',
      estatResponse: {},
    }
  },
  computed: {
    cdArea() {
      if (this.contents.cityCode) {
        return this.contents.cityCode
      } else {
        return ('0000000000' + this.contents.prefCode).slice(-2) + '000'
      }
    },
    statisticsClass() {
      return this.contents.statisticsClass
    },
    governmentType() {
      return this.contents.governmentType
    },
    estatParams() {
      return this.contents.estatParams
    },
    title(): string {
      return this.contents.title
    },
    titleId(): string {
      return this.contents.titleId
    },
    statName() {
      return this.estatData.statName
    },
    statUrl() {
      return this.estatData.statUrl
    },
    route(): string {
      return this.contents.route
    },
    chartComponent() {
      let chartComponent
      switch (this.contents.chartType) {
        case 'area':
          chartComponent = 'area-chart'
          break
        case 'line':
          chartComponent = 'line-chart'
          break
        case 'column':
          chartComponent = 'column-chart'
          break
      }
      return chartComponent
    },
    isSelector() {
      // 系列が複数の場合はデータセレクタを表示させる
      const num = Object.keys(this.contents.series.item).length
      if (num === 1) {
        return false
      } else {
        return true
      }
    },
    estatData() {
      return this.$formatEstatData(this.estatResponse, this.cdArea)
    },
    chartData() {
      const series = this.contents.series
      const value = this.estatData.value
      return series.item.map((d) => {
        return {
          name: d.name,
          data: value
            .filter((f) => f[`@${series.id}`] === d.code)
            .map((d) => {
              return {
                x: parseInt(d['@time'].substr(0, 4)),
                y: parseFloat(d.$),
                unit: d['@unit'],
              }
            }),
          unit: value[0]['@unit'],
        }
      })
    },
    estatCredit(): [] {
      return [
        'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
      ]
    },
    additionalDescription() {
      return this.contents.additionalDescription.concat(this.estatCredit)
    },
    docURL() {
      return 'test'
    },
    displayInfo() {
      const infoData = this.chartData[0]
      const length = infoData.data.length
      return {
        lText: infoData.data[length - 1].y.toLocaleString(),
        sText: infoData.data[length - 1].x + '年の' + infoData.name,
        unit: infoData.unit,
      }
    },
    times() {
      return this.estatData.classInfo
        .find((f) => f.id === 'time')
        .data.map((d) => {
          return {
            yearInt: parseInt(d['@code'].substr(0, 4)),
            yearStr: d['@code'],
          }
        })
    },
    tableHeaders() {
      return [
        { text: '年', value: 'year', width: '80px' },
        ...this.chartData.map((d) => {
          return {
            text: d.name,
            value: d.name,
            align: 'center',
            width: '100px',
          }
        }),
      ]
    },
    tableData() {
      return this.times.map((d) => {
        return Object.assign(
          { year: `${d.yearInt}年` },
          ...this.chartData.map((item) => {
            const value = item.data.find((f) => f.x === d.yearInt)
            if (value) {
              return {
                [item.name]: value.y.toLocaleString() + item.unit,
              }
            } else {
              return ''
            }
          })
        )
      })
    },
    displayData() {
      if (this.dataKind === 'all') {
        return this.chartData.slice(0, 1)
      } else {
        return this.chartData.slice(1)
      }
    },
    lastUpdate() {
      if (process.browser) {
        const day = new Date(document.lastModified)
        return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
      } else {
        return ''
      }
    },
  },
  methods: {},
  created() {},
}

export default Vue.extend(options)
</script>
