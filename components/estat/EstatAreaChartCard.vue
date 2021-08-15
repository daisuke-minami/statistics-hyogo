<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending" class="DataView">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :routes="routes">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <template v-slot:infoPanel>
              <data-view-data-set-panel :display-info="displayInfo" />
            </template>

            <area-chart
              v-show="canvas"
              :display-data="displayData"
              :y-axis-data="yAxisData"
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
              <app-link :to="docURL"> 政府統計の総合窓口e-stat </app-link>
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
  },
  async fetch() {
    this.formatData = await this.$formatEstatTimeChart(this.contents)
  },
  data() {
    return {
      canvas: true,
      formatData: [] as formatData,
    }
  },
  computed: {
    title() {
      return this.formatData.title
    },
    titleId() {
      return this.formatData.titleId
    },
    additionalDescription() {
      return this.formatData.additionalDescription
    },
    routes() {
      return this.formatData.routes
    },
    docURL() {
      return this.formatData.docURL
    },
    displayInfo() {
      return this.formatData.displayInfo
    },
    tableHeaders() {
      return this.formatData.tableHeaders
    },
    tableData() {
      return this.formatData.tableData
    },
    chartData() {
      return this.formatData.chartData
    },
    displayData() {
      // console.log(this.chartData)
      return this.chartData
    },
    lastUpdate() {
      if (process.browser) {
        const day = new Date(document.lastModified)
        return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
      } else {
        return ''
      }
    },
    yAxisData() {
      return this.chartData.map(
        (item: { max: any; min: any; opposite: any }) => ({
          max: item.max,
          min: item.min,
          opposite: item.opposite,
        })
      )
    },
  },
  methods: {},
}

export default Vue.extend(options)
</script>
