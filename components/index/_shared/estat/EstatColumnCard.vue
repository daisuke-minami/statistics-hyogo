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

            <template v-slot:infoPanel>
              <data-view-data-set-panel :display-info="displayInfo" />
            </template>

            <lazy-component
              :is="chartComponent"
              v-show="canvas"
              :display-data="displayData"
            />

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
  useContext,
  PropType,
  inject,
} from '@nuxtjs/composition-api'
import {
  formatTimeChart,
  formatAdditionalDescription,
} from '@/utils/formatEstat'
import { StateKey } from '@/composition/useState'
import { useEstatApi } from '@/composition/useEstatApi'
import {
  EstatParams,
  EstatSeries,
  EstatTimes,
  EstatResponse,
  EstatSource,
  CardTitle,
} from '~/types/estat'

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
  setup(props) {
    // canvas
    const canvas = ref<boolean>(true)

    // inject
    const State = inject(StateKey)
    const { code, govType, selectedPref, selectedCity, routingPath } = State

    // card情報の設定
    const title = computed((): string => {
      const name: string =
        govType.value === 'prefecture'
          ? selectedPref.value.prefName
          : selectedCity.value.cityName
      return `${name}の${props.cardTitle.title}`
    })
    const titleId = computed((): string => {
      return `${props.cardTitle.titleId}`
    })
    const route = computed((): string => {
      return `/${routingPath.value}/${titleId.value}/`
    })
    const lastUpdate = computed((): string => {
      if (process.browser) {
        const day = new Date(document.lastModified)
        return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
      } else {
        return ''
      }
    })

    const { $axios } = useContext()

    // eStat-APIからデータを取得
    const estatResponse = ref<EstatResponse>({})
    const { fetch } = useFetch(async () => {
      const params = Object.assign({}, props.estatParams)
      params.cdArea = code.value
      // const { data: res } = await context.root.$estat.get('getStatsData', {
      //   params,
      // })
      const res = await useEstatApi($axios, params).getData()
      estatResponse.value = res
    })
    fetch()

    // データの整形
    const series: EstatSeries[] = props.estatSeries
    const formatData = computed(() => {
      return formatTimeChart(estatResponse.value, series)
    })

    // chartの種類を設定
    const chartComponent = ref<string>('column-chart')

    const displayData = computed(() => {
      return formatData.value.chartData
    })

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

    // 注釈
    const additionalDescription = computed((): string[] => {
      return formatAdditionalDescription(props.estatAnnotation).timeChart
    })

    return {
      title,
      titleId,
      route,
      lastUpdate,
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
