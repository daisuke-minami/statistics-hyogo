<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :route="route">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <toggle-chart-type v-model="chartType" />

            <v-select
              v-model="targetYear"
              :items="times"
              item-text="yearName"
              item-value="yearInt"
              @change="$emit('input', $event)"
            />

            <div v-if="chartType === 'map'">
              <map-chart-pref
                v-show="canvas"
                :display-data="displayData"
                :topo-json="topoJson"
              />
            </div>

            <div v-if="chartType === 'bar'">
              <bar-chart v-show="canvas" :display-data="displayData" />
            </div>

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
import axios from 'axios'

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
  // APIから取得する場合
  // async fetch() {
  //   const params = this.contents.estatParams
  //   params.cdArea = this.cdArea
  //   const { data } = await this.$estat.get(
  //     `${process.env.BASE_URL}/json/getStatsData`,
  //     { params }
  //   )
  //   this.estatResponse = data
  //   this.targetYear = this.latestYearInt
  // },
  // JSONから取得する場合
  async fetch() {
    this.estatResponse = await import(
      `~/static/pagecontents/${this.statisticsClass}/${this.governmentType}/${this.titleId}.json`
    )
    this.targetYear = this.latestYearInt

    const prefMap = await axios.get(
      `https://geoshape.ex.nii.ac.jp/city/topojson/20200101/jp_pref.c.topojson`
    )
    this.prefMap = prefMap.data
  },
  data() {
    return {
      canvas: true,
      targetYear: null,
      chartType: 'map',
      prefMap: {},
      estatResponse: {},
    }
  },
  computed: {
    title() {
      return `都道府県の${this.contents.title}ランキング`
    },
    cdArea() {
      return this.contents.prefList.map(
        (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
      )
    },
    statisticsClass() {
      return this.contents.statisticsClass
    },
    governmentType() {
      return this.contents.governmentType
    },
    titleId() {
      return this.contents.titleId
    },
    statName() {
      const TABLE_INF =
        this.estatResponse.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
      return `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`
    },
    statUrl() {
      const TABLE_INF =
        this.estatResponse.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
      return `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`
    },
    estatCredit() {
      return [
        'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
      ]
    },
    codhCredit() {
      return ['『歴史的行政区域データセットβ版』（CODH作成）']
    },
    additionalDescription() {
      return this.contents.additionalDescription.concat(
        this.estatCredit,
        this.codhCredit
      )
    },
    route() {
      return this.contents.route
    },
    topoJson() {
      return this.prefMap
    },
    times() {
      const value =
        this.estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      const times = Array.from(new Set(value.map((d) => d['@time']))).map(
        (d) => {
          return {
            yearInt: parseInt(d.substr(0, 4)),
            yearStr: d,
            yearName: `${d.substr(0, 4)}年`,
          }
        }
      )
      return times.sort((a, b) => {
        if (a.yearStr > b.yearStr) return -1
        if (a.yearStr < b.yearStr) return 1
        return 0
      })
    },
    latestYearInt() {
      return this.times[0].yearInt
    },
    chartData() {
      const value =
        this.estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      return this.times.map((d) => {
        const v = value.filter((f) => f['@time'] === d.yearStr)
        return {
          year: d.yearInt,
          name: this.title,
          data: this.prefList.map((d) => {
            const cdArea = ('0000000000' + d.prefCode).slice(-2) + '000'
            const data = v.find((f) => f['@area'] === cdArea)
            if (data) {
              return {
                prefCode: cdArea,
                prefName: d.prefName,
                value: parseInt(data.$),
                unit: data['@unit'],
              }
            } else {
              return {
                prefCode: cdArea,
                prefName: d.lgName,
                value: '',
                unit: '',
              }
            }
          }),
        }
      })
    },
    tableHeaders() {
      return [
        { text: '都道府県名', value: 'prefName', width: '80px' },
        ...this.times.map((d) => {
          return {
            text: `${d.yearInt}年`,
            value: `${d.yearInt}年`,
            align: 'center',
            width: '100px',
          }
        }),
      ]
    },
    tableData() {
      return this.prefList.map((d) => {
        const cdArea = ('0000000000' + d.prefCode).slice(-2) + '000'
        return Object.assign(
          { prefName: d.prefName },
          ...this.chartData.map((d) => {
            const data = d.data.find((f) => f.prefCode === cdArea)
            const year = `${d.year}年`
            if (data) {
              return {
                [year]: data.value.toLocaleString() + data.unit,
              }
            } else {
              return ''
            }
          })
        )
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
    displayData() {
      return this.chartData.filter((f) => f.year === this.targetYear)
    },
  },
  watch: {
    chartType() {
      this.$fetch()
    },
    contents() {
      this.$fetch()
    },
  },
  created() {},
}
</script>
