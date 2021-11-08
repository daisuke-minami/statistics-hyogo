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

            <toggle-big-city v-model="bigcityKind" />
            <toggle-chart-type v-model="chartType" />

            <v-select
              v-model="targetYear"
              :items="times"
              item-text="yearName"
              item-value="yearInt"
              @change="$emit('input', $event)"
            />

            <div v-if="chartType === 'map'">
              <map-chart-city
                v-show="canvas"
                :display-data="displayData"
                :bigcity-kind="bigcityKind"
              />
            </div>

            <div v-if="chartType === 'bar'">
              <bar-chart
                v-show="canvas"
                :display-data="displayData"
                :bigcity-kind="bigcityKind"
              />
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
import { mdiChartBar, mdiDatabaseCog } from '@mdi/js'
export default {
  props: {
    cityList: {
      type: Array,
      required: true,
    },
    contents: {
      type: Object,
      required: true,
    },
  },
  // APIから取得する場合
  async fetch() {
    const params = this.contents.estatParams
    params.cdArea = this.cdArea
    this.estatResponse = await this.$getEstatAPI(params)
  },
  // JSONから取得する場合
  // async fetch() {
  //   this.estatResponse = await import(
  //     `~/static/pagecontents/${this.statisticsClass}/${this.governmentType}/${this.titleId}.json`
  //   )
  //   this.targetYear = this.estatData.latestYearInt
  // },
  data() {
    return {
      mdiChartBar,
      mdiDatabaseCog,
      bigcityKind: 'all',
      chartType: 'map',
      canvas: true,
      targetYear: null,
      estatResponse: {},
    }
  },
  computed: {
    innerCityList() {
      if (this.bigcityKind === 'all') {
        return this.cityList.filter((d) => d.bigCityFlag !== '1')
      } else {
        return this.cityList.filter((d) => d.bigCityFlag !== '2')
      }
    },
    estatData() {
      return this.$formatEstatData(this.estatResponse, null)
    },
    cdArea() {
      return this.cityList.map((d) => {
        return d.cityCode
      })
    },
    statisticsClass() {
      return this.contents.statisticsClass
    },
    governmentType() {
      return this.contents.governmentType
    },
    title() {
      return `市区町村の${this.contents.title}ランキング`
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
    times() {
      const times = this.estatData.times
      return times.sort((a, b) => {
        if (a.yearStr > b.yearStr) return -1
        if (a.yearStr < b.yearStr) return 1
        return 0
      })
    },
    chartData() {
      return this.times.map((d) => {
        const value = this.estatData.value.filter(
          (f) => f['@time'] === d.yearStr
        )
        return {
          year: d.yearInt,
          name: this.title,
          data: this.cityList.map((d) => {
            const data = value.find((f) => f['@area'] === d.cityCode)
            if (data) {
              return {
                cityCode: d.cityCode,
                cityName: d.cityName,
                value: parseInt(data.$),
                unit: data['@unit'],
              }
            } else {
              return {
                cityCode: d.cityCode,
                cityName: d.cityName,
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
        { text: '市区町村名', value: 'cityName', width: '80px' },
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
      return this.cityList.map((d) => {
        const cityCode = d.cityCode
        return Object.assign(
          { cityName: d.cityName },
          ...this.chartData.map((d) => {
            const data = d.data.find((f) => f.cityCode === cityCode)
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
    bigcityKind() {
      this.$fetch()
    },
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
