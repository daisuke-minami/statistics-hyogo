<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending" class="DataView">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :route="routingPath">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <template v-slot:infoPanel>
              <data-view-data-set-panel :display-info="displayInfo" />
            </template>

            <toggle-break
              v-model="allbreak"
              :target-id="titleId"
              :style="{ display: canvas ? 'inline-block' : 'none' }"
            />

            <toggle-column-line v-model="columnline" />

            <lazy-component
              :is="chartComponent"
              v-show="canvas"
              :display-data="displayData"
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
              <app-link :to="source.url"> {{ source.name }} </app-link>
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
  useFetch,
} from '@nuxtjs/composition-api'
// import { getGraphSeriesStyle } from '@/utils/colors'
import {
  EstatParams,
  TimeSeries,
  formatTimeChart,
  formatAdditionalDescription,
  formatSource,
  // formatTimeList,
  Source,
  // Times,
} from '@/utils/formatEstat'
import { Contents, GovType } from '@/store/setting'
// import { TimeSeries } from '@/utils/formatEstat'
import { City } from '~/store/cityList'
import { Pref } from '~/store/prefList'

type Props = {
  contents: Contents
}

export default defineComponent({
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  setup(props: Props, context) {
    const canvas = ref<boolean>(true)

    // 都道府県・市区町村情報
    const selectedPref = computed((): Pref => {
      return props.contents.selectedPref
    })
    const selectedCity = computed((): City => {
      return props.contents.selectedCity
    })
    const govType = computed((): GovType => {
      return props.contents.govType
    })

    // タイトルの設定
    const name =
      govType.value === 'prefecture'
        ? selectedPref.value.prefName
        : selectedCity.value.cityName

    const title = computed((): string => {
      return `${name}の${props.contents.title}`
    })
    const titleId = computed((): string => {
      return props.contents.titleId
    })

    // cdAreaの設定
    const cdArea = computed((): string => {
      if (govType.value === 'city') {
        return selectedCity.value.cityCode
      } else {
        return ('0000000000' + selectedPref.value.prefCode).slice(-2) + '000'
      }
    })

    // eStat-APIからデータを取得
    const estatParams = computed((): EstatParams => {
      return props.contents.estatParams
    })
    const estatResponse = ref({})
    useFetch(async () => {
      const params: EstatParams = estatParams.value
      params.cdArea = cdArea.value
      const { data } = await context.root.$estat.get(
        `${process.env.BASE_URL}/json/getStatsData`,
        { params }
      )
      estatResponse.value = data
    })

    // ColumnChartとLineChartの切替
    const columnline = ref<string>('column')
    const chartComponent = computed((): string => {
      const chartComponent =
        columnline.value === 'column' ? 'column-chart' : 'line-chart'
      return chartComponent
    })

    // 出典
    const source = computed((): Source => {
      return formatSource(estatResponse.value)
    })

    const chartData = computed(
      (): TimeSeries[] =>
        formatTimeChart(estatResponse.value, props.contents.series).chartData
    )

    // 注釈
    const additionalDescription = computed((): string[] => {
      return formatAdditionalDescription(props.contents.annotation)
    })

    // 動的ルーティングのパス
    const routingPath = computed((): string => {
      return `${props.contents.routingPath}/Timechart`
    })

    const displayInfo = computed(() => {
      const d: TimeSeries = chartData.value[0]
      const l: number = d.data.length
      return {
        lText: d.data[l - 1].y.toLocaleString(),
        sText: d.data[l - 1].x + '年の' + d.data.name,
        unit: d.data[0].unit,
      }
    })

    // const times = computed((): Times[] => {
    //   return formatTimeList(estatResponse.value)
    // })

    const tableHeaders = computed(() => {
      return formatTimeChart(estatResponse.value, props.contents.series)
        .tableHeaders
    })

    const tableData = computed(() => {
      return formatTimeChart(estatResponse.value, props.contents.series)
        .tableData
    })

    // 総数／内訳の切替
    const allbreak = ref<string>('all')
    const displayData = computed(() => {
      if (allbreak.value === 'all') {
        return chartData.value.slice(0, 1)
      } else {
        return chartData.value.slice(1)
      }
    })

    const lastUpdate = computed((): string => {
      if (process.browser) {
        const day = new Date(document.lastModified)
        return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
      } else {
        return ''
      }
    })

    return {
      title,
      titleId,
      routingPath,
      lastUpdate,
      allbreak,
      displayData,
      additionalDescription,
      source,
      tableHeaders,
      tableData,
      canvas,
      columnline,
      displayInfo,
      chartComponent,
    }
  },
})
</script>
