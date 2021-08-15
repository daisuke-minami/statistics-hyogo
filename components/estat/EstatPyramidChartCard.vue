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
            <div>
              <v-row>
                <v-col>
                  <v-select
                    v-model="targetYear"
                    :items="Times"
                    item-text="yearName"
                    item-value="year"
                    @change="$emit('input', $event)"
                  />
                </v-col>
              </v-row>
            </div>

            <pyramid-chart
              v-show="canvas"
              :display-data="displayData"
              :categories="categories"
            />

            <template v-slot:description>
              <p>最終更新日：{{ formatData.lastUpdate }}</p>
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

<script>
export default {
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    this.formatData = await this.$formatEstatPyramidChart(this.contents)
  },
  data() {
    return {
      canvas: true,
      formatData: [],
      targetYear: 2015,
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
      return this.formatData.tableData.find((d) => d.year === this.targetYear)
        .data
    },
    chartData() {
      return this.formatData.chartData
    },
    displayData() {
      return this.chartData.find((d) => d.year === this.targetYear).data
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
      return this.chartData.map((item) => ({
        max: item.max,
        min: item.min,
        opposite: item.opposite,
      }))
    },
    categories() {
      return this.formatData.pyramidCategories
    },
    Times() {
      return this.formatData.resTimes
        .map((item) => {
          return {
            yearName: `${item.yearInt}年`,
            year: item.yearInt,
          }
        })
        .sort((a, b) => {
          if (a.yearName > b.yearName) return -1
          if (a.yearName < b.yearName) return 1
          return 0
        })
    },
  },
}
</script>
