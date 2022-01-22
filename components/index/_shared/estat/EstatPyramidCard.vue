<template>
  <data-view :title="title" :route="path">
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { useEstatPyramidChart } from '@/composition/useEstatPyramidChart'
import { EstatTimes } from '~/types/estat'

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
      timeList,
    } = useEstatPyramidChart(props.estatState)

    // console.log({
    //   title,
    //   titleId,
    //   path,
    //   lastUpdate,
    //   chartData,
    //   tableHeader,
    //   tableData,
    //   source,
    //   additionalDescription,
    // })

    // 年次セレクト
    const times = computed(() => {
      return timeList.value
    })
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
