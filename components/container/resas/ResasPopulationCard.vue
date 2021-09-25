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

            <template v-slot:button>
              <toggle-break
                v-model="dataKind"
                :target-id="titleId"
                :style="{ display: canvas ? 'inline-block' : 'none' }"
              />
            </template>

            <line-chart v-show="canvas" :display-data="displayData" />

            <template v-slot:additionalDescription>
              <span>（注）</span>
              <ul>
                <li v-for="item in additionalDescription" :key="item">
                  {{ item }}
                </li>
              </ul>
              <slot name="additionalDescription" />
            </template>

            <!-- <template v-slot:dataTable>
              <client-only>
                <data-view-table :headers="tableHeaders" :items="tableData" />
              </client-only>
            </template> -->

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
    // console.log(this.contents)
    // パラメータ設定
    // const resasParams = cloneDeep(this.contents.resasParams)
    // resasParams.prefCode = this.prefCode
    // resasParams.cityCode = this.cityCode
    // API取得
    this.resasResponse = await this.$getResasAPI(
      this.resasUrl,
      this.resasParams
    )
  },
  // async fetch() {
  //   // console.log(this.contents)
  //   this.resasResponse = await import(
  //     `~/static/pagecontents/${this.contents.estatJsonPath}`
  //   )
  // },
  data() {
    return {
      dataKind: 'all',
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
    resasUrl() {
      return this.contents.resasUrl
    },
    resasParams() {
      return {
        prefCode: this.prefCode,
        cityCode: this.cityCode,
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
      return this.resasResponse.data.map((d) => {
        return {
          name: d.label,
          data: d.data.map((d) => {
            return {
              x: d.year,
              y: d.value,
            }
          }),
        }
      })
    },
    displayData() {
      if (this.dataKind === 'all') {
        return this.chartData.filter((f) => f.name === '総人口')
      } else {
        return this.chartData.filter((f) => f.name !== '総人口')
      }
    },
  },
}
</script>
