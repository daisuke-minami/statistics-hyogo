<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
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
  inject,
} from '@nuxtjs/composition-api'
import {
  TimeSeries,
  formatTimeChart,
  formatAdditionalDescription,
  formatSource,
  Source,
} from '@/utils/formatEstat'
import {
  GovernmentStateType,
  GovernmentStateKey,
} from '@/composition/government'
import { CardStateType, CardStateKey } from '@/composition/card'
import { EstatStateKey } from '@/composition/estat'
// import { PlotLineOrBand } from 'highcharts'

export default defineComponent({
  setup(_, context) {
    // canvas
    const canvas = ref<boolean>(true)

    // inject
    const govState: GovernmentStateType = inject(GovernmentStateKey)
    const cardState: CardStateType = inject(CardStateKey)
    const estatState: any = inject(EstatStateKey)

    // eStat-APIからデータを取得
    const estatResponse = ref({})
    useFetch(async () => {
      const params = Object.assign({}, estatState.estatParams.value)
      params.cdArea = govState.code.value
      const { data: res } = await context.root.$estat.get('getStatsData', {
        params,
      })
      estatResponse.value = res
    })

    // title
    const title = computed((): string => {
      const name =
        govState.govType.value === 'prefecture'
          ? govState.selectedPref.value.prefName
          : govState.selectedCity.value.cityName
      return `${name}の${cardState.title.value}`
    })

    // titleId
    const titleId = cardState.titleId.value

    // routingPath
    const routingPath = `${cardState.routingPath.value}/timechart`

    // ColumnChartとLineChartの切替
    const chartComponent = computed((): string => {
      return 'column-line-chart'
    })

    // 総数／内訳の切替
    const allbreak = ref<string>('all')
    const displayData = computed(() => {
      const data = JSON.parse(JSON.stringify(chartData.value))
      const column: TimeSeries[] = data.filter((f) => f.type === 'column')
      const line: TimeSeries[] = data.filter((f) => f.type === 'line')
      // console.log(column)
      // console.log(line)
      if (allbreak.value === 'all') {
        return column.slice(0, 1).concat(line)
      } else {
        return column.slice(1).concat(line)
      }
    })

    // 出典
    const source = computed((): Source => {
      return formatSource(estatResponse.value)
    })

    const series = estatState.series.value
    const chartData = computed((): TimeSeries[] => {
      return formatTimeChart(estatResponse.value, series).chartData
    })

    // 注釈
    const annotation = estatState.annotation.value
    // console.log(annotation)
    const additionalDescription = computed((): string[] => {
      return formatAdditionalDescription(annotation)
    })

    const displayInfo = computed(() => {
      const d: TimeSeries = chartData.value[0]
      const l: number = d.data.length
      // console.log(d)
      return {
        lText: d.data[l - 1].y.toLocaleString(),
        sText: d.data[l - 1].x + '年の' + d.name,
        unit: d.data[0].unit,
      }
    })

    const tableHeaders = computed(() => {
      return formatTimeChart(estatResponse.value, series).tableHeaders
    })

    const tableData = computed(() => {
      return formatTimeChart(estatResponse.value, series).tableData
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
      // columnline,
      displayInfo,
      chartData,
      chartComponent,
    }
  },
})
</script>
