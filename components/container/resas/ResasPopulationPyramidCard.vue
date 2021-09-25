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

            <pyramid-chart v-show="canvas" :display-data="displayData" />

            <template v-slot:slider>
              <data-slider v-model="year" :target-id="titleId" />
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
    // API取得
    this.year = 2015
    this.resasResponse = await this.$getResasAPI(
      this.contents.resasUrl,
      this.resasParams
    )
  },
  data() {
    return {
      year: null,
      canvas: true,
      resasResponse: {},
    }
  },
  computed: {
    prefCode() {
      return this.contents.prefCode
    },
    cityCode() {
      if (this.contents.cityCode) {
        return this.contents.cityCode
      } else {
        return '-'
      }
    },
    resasParams() {
      return {
        prefCode: this.prefCode,
        cityCode: this.cityCode,
        yearLeft: String(this.year),
        yearRight: '2040',
      }
    },
    title() {
      return this.contents.title
    },
    titleId() {
      return this.contents.titleId
    },
    statName() {
      return '地域経済分析システム「RESAS」'
    },
    statUrl() {
      return `https://opendata.resas-portal.go.jp/docs/${this.contents.resasUrl}.html`
    },
    resasCredit() {
      return ['地域経済分析システム「RESAS」を加工して作成']
    },
    route() {
      return this.contents.route
    },
    additionalDescription() {
      return this.contents.additionalDescription.concat(this.resasCredit)
    },
    chartData() {
      return this.resasResponse.yearLeft.data
    },
    displayData() {
      return this.chartData.map((d) => {
        return {
          category: d.class,
          man: d.man,
          woman: d.woman,
          unit: this.contents.unit,
        }
      })
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
    year() {
      this.$fetch()
    },
  },
}
</script>
