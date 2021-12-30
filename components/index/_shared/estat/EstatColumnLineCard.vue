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

            <!-- <toggle-break
              v-model="allbreak"
              :target-id="titleId"
              :style="{ display: canvas ? 'inline-block' : 'none' }"
            />

            <toggle-column-line v-model="columnline" /> -->

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
                <data-view-table :headers="tableHeader" :items="tableData" />
              </client-only>
            </template>

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
  useFetch,
  PropType,
  inject,
} from '@nuxtjs/composition-api'
import {
  EstatParams,
  EstatSeries,
  EstatTimes,
  EstatResponse,
  EstatSource,
  formatTimeChart,
  CardTitle,
  formatAdditionalDescription,
} from '@/utils/formatEstat'

import { PageStateType, PageStateKey } from '@/composition/pageState'

export default defineComponent({
  props: {
    cardTitle: {
      type: Object as PropType<CardTitle>,
      required: true,
    },
    estatParams: {
      type: Object as PropType<EstatParams>,
      required: true,
    },
    estatSeries: {
      type: Array as PropType<EstatSeries[]>,
      required: true,
    },
    estatLatestYear: {
      type: Object as PropType<EstatTimes>,
      required: true,
    },
    estatAnnotation: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props, context) {
    // canvas
    const canvas = ref<boolean>(true)

    // inject
    const pageState: PageStateType = inject(PageStateKey)
    const code = pageState.code.value
    const govType = pageState.govType.value
    const selectedPref = pageState.selectedPref.value
    const selectedCity = pageState.selectedCity.value
    // const routingPath = pageState.routingPath.value

    /* eslint-disable no-console */
    console.log({ code, govType, selectedPref, selectedCity })

    // card情報の設定
    const title = computed((): string => {
      const name: string =
        govType === 'prefecture' ? selectedPref.prefName : selectedCity.cityName
      return `${name}の${props.cardTitle.title}`
    })
    const titleId = computed((): string => {
      return `${props.cardTitle.titleId}`
    })
    const routingPath = computed((): string => {
      return `/${pageState.routingPath.value}/${titleId.value}/`
    })

    // eStat-APIからデータを取得
    const estatResponse = ref<EstatResponse>({})
    const { fetch } = useFetch(async () => {
      const params = Object.assign({}, props.estatParams)
      params.cdArea = code
      const { data: res } = await context.root.$estat.get('getStatsData', {
        params,
      })
      estatResponse.value = res
    })
    fetch()

    // データの整形
    const series: EstatSeries[] = props.estatSeries
    const formatData = computed(() => {
      return formatTimeChart(estatResponse.value, series)
    })

    // chartの種類を設定
    const chartComponent = computed((): string => {
      return 'column-line-chart'
    })

    const displayData = computed(() => {
      return formatData.value.chartData
    })

    /* eslint-disable no-console */
    console.log({ estatResponse, series, formatData, displayData })

    const displayInfo = computed(() => {
      const d: EstatSeries = formatData.value.chartData[0]
      const l: number = d.data.length
      return {
        lText: d.data[l - 1].y.toLocaleString(),
        sText: d.data[l - 1].x + '年の' + d.name,
        unit: d.data[l - 1].unit,
      }
    })

    // テーブルの設定
    const tableHeader = computed(() => {
      return formatData.value.tableHeader
    })
    const tableData = computed(() => {
      return formatData.value.tableData
    })

    // 出典
    const source = computed((): EstatSource => {
      return formatData.value.source
    })

    const lastUpdate = computed((): string => {
      if (process.browser) {
        const day = new Date(document.lastModified)
        return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
      } else {
        return ''
      }
    })

    // 注釈
    const additionalDescription = computed((): string[] => {
      return formatAdditionalDescription(props.estatAnnotation).timeChart
    })

    return {
      title,
      titleId,
      routingPath,
      lastUpdate,
      // allbreak,
      displayData,
      additionalDescription,
      source,
      tableHeader,
      tableData,
      canvas,
      displayInfo,
      chartComponent,
    }
  },
})
</script>
