<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :routes="routes">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <v-select
              v-model="targetYear"
              :items="Times"
              item-text="yearName"
              item-value="year"
              @change="$emit('input', $event)"
            />

            <map-chart-pref
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
    prefList: {
      type: Array,
      required: true,
    },
    contents: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    this.formatData = await this.$formatEstatRankMapChart(
      this.contents,
      this.prefList,
      null
    )
    this.targetYear = this.formatData.resTimes[0].yearInt
    // console.log(this.formatData.resTimes)
  },
  data() {
    return {
      canvas: true,
      targetYear: null,
      formatData: [],
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
    chartData() {
      return this.formatData.chartData
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
      return [
        {
          max: this.displayData[0].max,
          min: this.displayData[0].min,
        },
      ]
    },
    displayData() {
      const displayData = this.chartData.filter(
        (d) => d.year === this.targetYear
      )
      displayData[0].joinBy = ['N03_001', 'cityName']
      displayData[0].states = { hover: { color: '#a4edba' } }
      return displayData
    },
  },
  created() {},
}
</script>
