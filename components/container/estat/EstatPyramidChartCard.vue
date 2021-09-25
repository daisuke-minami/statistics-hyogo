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
            <div>
              <v-row>
                <v-col>
                  <v-select
                    v-model="targetYear"
                    :items="times"
                    item-text="yearName"
                    item-value="yearInt"
                    @change="$emit('input', $event)"
                  />
                </v-col>
              </v-row>
            </div>

            <pyramid-chart v-show="canvas" :display-data="displayData" />

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

<script>
// import { cloneDeep } from 'lodash'

export default {
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    this.estatResponse = await import(
      `~/static/pagecontents/${this.contents.estatJsonPath}`
    )
    this.estatData = this.$formatEstatData(this.estatResponse, this.cdArea)
    this.targetYear = this.estatData.latestYearInt
  },
  data() {
    return {
      canvas: true,
      targetYear: null,
      estatResponse: {},
      estatData: {},
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
    title() {
      return this.contents.title
    },
    titleId() {
      return this.contents.titleId
    },
    statName() {
      return this.estatData.statName
    },
    statUrl() {
      return this.estatData.statUrl
    },
    route() {
      return this.contents.route
    },
    estatCredit() {
      return [
        'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
      ]
    },
    additionalDescription() {
      return this.contents.additionalDescription.concat(this.estatCredit)
    },
    times() {
      const times = this.estatData.times
      return times.sort((a, b) => {
        if (a.yearStr > b.yearStr) return -1
        if (a.yearStr < b.yearStr) return 1
        return 0
      })
    },
    dataByTime() {
      return this.times
        .map((d) => {
          return {
            year: d.yearInt,
            data: this.estatData.value.filter((f) => f['@time'] === d.yearStr),
          }
        })
        .filter((f) => f.data.length !== 0)
    },
    chartData() {
      return this.dataByTime.map((d) => {
        return {
          year: d.year,
          data: this.setPyramidData(d.data),
        }
      })
    },
    displayData() {
      return this.chartData.find((f) => f.year === this.targetYear).data
    },
    tableHeaders() {
      return [
        { text: '年齢区分', value: 'category', align: 'end' },
        { text: '男性', value: 'man', align: 'end' },
        { text: '女性', value: 'woman', align: 'end' },
      ]
    },
    tableData() {
      return this.displayData.map((d) => {
        return {
          category: d.category,
          man: d.man.toLocaleString() + '人',
          woman: d.woman.toLocaleString() + '人',
        }
      })
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
  methods: {
    setPyramidData(data) {
      const id = this.contents.series.id
      const item = this.contents.series.item
      return item.map((d) => {
        return {
          category: d.name,
          man: parseInt(data.find((f) => f[`@${id}`] === d.man).$),
          woman: parseInt(data.find((f) => f[`@${id}`] === d.woman).$),
          unit: data[0]['@unit'],
        }
      })
    },
  },
}
</script>
