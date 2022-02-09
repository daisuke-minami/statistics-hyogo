<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :route="path">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>
            <div>
              <v-row>
                <v-col>
                  <v-select
                    v-model="selectedTime"
                    :items="times"
                    item-text="yearName"
                    item-value="yearInt"
                    return-object
                    @change="$emit('input', $event)"
                  />
                </v-col>
              </v-row>
            </div>

            <pyramid-chart v-show="canvas" :display-data="displayData" />

            <template v-slot:description>
              <p>最終更新日:{{ lastUpdate }}</p>
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

            <!-- <template v-slot:dataTable>
              <client-only>
                <data-view-table :headers="tableHeader" :items="tableData" />
              </client-only>
            </template> -->

            <template v-slot:footer>
              <app-link :to="source.estatUrl">
                {{ source.estatName }}
              </app-link>
            </template>
          </data-view>
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRoute,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { useEstatPyramidChart } from '@/composition/useEstatPyramidChart'
import { EstatResponse, EstatTimes } from '~/types/estat'
import { useEstatApi } from '~/composition/useEstatApi'

export default defineComponent({
  props: {
    estatState: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // canvas
    const canvas = true

    // routeパラメータの取得
    const { code } = useRoute().value.params

    // reactive値
    const estatResponse = ref<EstatResponse>()

    // eStat-APIからデータを取得
    const { $axios } = useContext()
    const { fetch } = useFetch(async () => {
      const params = Object.assign({}, props.estatState.params)
      params.cdArea = code
      estatResponse.value = await useEstatApi($axios, params).getData()
    })
    fetch()

    const {
      title,
      titleId,
      path,
      lastUpdate,
      chartData,
      // tableHeader,
      // tableData,
      source,
      additionalDescription,
      times,
    } = useEstatPyramidChart(props.estatState, estatResponse)

    // 年次セレクト
    const selectedTime = ref<EstatTimes>(props.estatState.latestYear)

    // chartの種類を設定
    const chartComponent = 'pyramid-chart'

    // 年次で表示データを切替
    const displayData = computed(() => {
      const c = chartData.value
      return c.filter((f) => f.year === selectedTime.value.yearInt)
    })

    return {
      title,
      titleId,
      path,
      lastUpdate,
      displayData,
      additionalDescription,
      source,
      // tableHeader,
      // tableData,
      canvas,
      // displayInfo,
      chartComponent,
      times,
      selectedTime,
    }
  },
})

// export default {
//   props: {
//     contents: {
//       type: Object,
//       required: true,
//     },
//   },
//   async fetch() {
//     const params = this.contents.estatParams
//     params.cdArea = this.cdArea
//     this.estatResponse = await this.$getEstatAPI(params)
//     this.targetYear = this.estatData.latestYearInt
//   },
//   data() {
//     return {
//       canvas: true,
//       targetYear: null,
//       estatResponse: {},
//       // estatData: {},
//     }
//   },
//   computed: {
//     dataByTime() {
//       const value =
//         this.estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
//       return this.times
//         .map((d) => {
//           return {
//             year: d.yearInt,
//             data: value.filter((f) => f['@time'] === d.yearStr),
//           }
//         })
//         .filter((f) => f.data.length !== 0)
//     },
//     chartData() {
//       return this.dataByTime.map((d) => {
//         return {
//           year: d.year,
//           data: this.setPyramidData(d.data),
//         }
//       })
//     },
//     displayData() {
//       return this.chartData.find((f) => f.year === this.targetYear).data
//     },
//     tableHeaders() {
//       return [
//         { text: '年齢区分', value: 'category', align: 'end' },
//         { text: '男性', value: 'man', align: 'end' },
//         { text: '女性', value: 'woman', align: 'end' },
//       ]
//     },
//     tableData() {
//       return this.displayData.map((d) => {
//         return {
//           category: d.category,
//           man: d.man.toLocaleString() + '人',
//           woman: d.woman.toLocaleString() + '人',
//         }
//       })
//     },
//     lastUpdate() {
//       if (process.browser) {
//         const day = new Date(document.lastModified)
//         return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
//       } else {
//         return ''
//       }
//     },
//   },
//   methods: {
//     setPyramidData(data) {
//       const id = this.contents.series.id
//       const item = this.contents.series.item
//       return item.map((d) => {
//         return {
//           category: d.name,
//           man: parseInt(data.find((f) => f[`@${id}`] === d.man).$),
//           woman: parseInt(data.find((f) => f[`@${id}`] === d.woman).$),
//           unit: data[0]['@unit'],
//         }
//       })
//     },
//   },
// }
</script>
