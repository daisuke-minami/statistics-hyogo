<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="cardTitle" :route="cardRoutingPath">
            <h4 :id="cardTitleId" class="visually-hidden">
              {{ cardTitle }}
            </h4>

            <toggle-map-bar v-model="mapbar" />

            <v-row>
              <v-col>
                <v-select
                  v-model="selectedSeries"
                  :items="series"
                  item-text="name"
                  item-value="name"
                  return-object
                />
              </v-col>
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

            <lazy-component
              :is="chartComponent"
              v-show="canvas"
              :display-data="displayData"
              :topo-json="topoJson"
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
  watch,
  useFetch,
  useStore,
  inject,
} from '@nuxtjs/composition-api'
import {
  GovernmentStateType,
  GovernmentStateKey,
} from '@/composition/government'
import { CardStateType, CardStateKey } from '@/composition/card'
import { EstatStateType, EstatStateKey, Series } from '@/composition/estat'

// MapChart
const MapChart = () => {
  return import('@/components/index/_shared/highcharts/MapChartPref.vue')
}
// BarChart
const BarChart = () => {
  return import('@/components/index/_shared/highcharts/BarChart.vue')
}

export default defineComponent({
  setup(_, context) {
    // canvas
    const canvas = ref<boolean>(true)

    // カードの情報
    const cardState: CardStateType = inject(CardStateKey)
    const title = cardState.title.value
    const titleId = cardState.titleId.value
    const routingPath = cardState.routingPath.value

    // 都道府県・市区町村の情報
    const govState: GovernmentStateType = inject(GovernmentStateKey)
    const govType = govState.govType.value
    const selectedPref = govState.selectedPref.value
    const selectedCity = govState.selectedCity.value
    const prefList = govState.prefList.value

    // estatの情報
    const estatState: EstatStateType = inject(EstatStateKey)
    const estatParams = estatState.estatParams.value
    const series = estatState.series.value
    const annotation = estatState.annotation.value
    const latestYear = estatState.latestYear.value

    // cardTitle
    const cardTitle = computed((): string => {
      const name =
        govType === 'prefecture' ? selectedPref.prefName : selectedCity.cityName
      return `${name}の${title}Rank`
    })

    // cardTitleId
    const cardTitleId = titleId

    // cardRoutingPath
    const cardRoutingPath = `${routingPath}/rankchart`

    // eStat-APIからデータを取得
    const estatResponse = ref({})
    const { fetch } = useFetch(async () => {
      const params = Object.assign({}, estatParams)
      const series = selectedSeries.value
      if (series.id === 'cat01') {
        params.cdCat01 = series.code
      }
      params.cdArea = prefList.map(
        (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
      )
      const { data: res } = await context.root.$estat.get(`getStatsData`, {
        params,
      })
      console.log(res)
      estatResponse.value = res
    })

    // 系列をセット
    const selectedSeries = ref<Series>(series[0])
    fetch()
    watch(selectedSeries, () => fetch())
    // watch(selectedTime, () => fetch())

    const chartData = computed(() => {
      const value =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      // console.log('value', value)
      return times.value.map((d) => {
        const v = value.filter((f) => f['@time'] === d.yearStr)
        return {
          year: d.yearInt,
          name: title,
          data: prefList.map((d) => {
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
                prefName: 'test',
                value: '',
                unit: '',
              }
            }
          }),
        }
      })
    })

    const selectedTime = ref<Time>(latestYear)

    // ストアから都道府県リストを取得
    const store = useStore()
    const prefMap = computed(() => store.getters['topojson/getMapPref'])

    // MapChartとBarChartの切替
    const mapbar = ref<string>('map')
    const chartComponent = computed((): string => {
      const chartComponent = mapbar.value === 'map' ? MapChart : BarChart
      return chartComponent
    })

    // 出典
    const source = computed((): Source => {
      const TABLE_INF =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
      return {
        name: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
        url: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
      }
    })

    const times = computed((): Times[] => {
      const value =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
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
    })

    // 注釈
    const estatCredit = ref<string>(
      'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません'
    )
    // const annotation = computed((): string[] => {
    //   return estatState.annotation.value
    // })
    const additionalDescription = computed((): string[] => {
      return annotation.concat(estatCredit.value)
    })

    const displayData = computed(() => {
      return chartData.value.filter(
        (f) => f.year === selectedTime.value.yearInt
      )
    })

    const lastUpdate = computed((): string => {
      if (process.browser) {
        const day = new Date(document.lastModified)
        return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
      } else {
        return ''
      }
    })

    const tableHeaders = computed(() => {
      return [
        { text: '都道府県名', value: 'prefName', width: '80px' },
        ...times.value.map((d) => {
          return {
            text: `${d.yearInt}年`,
            value: `${d.yearInt}年`,
            align: 'center',
            width: '100px',
          }
        }),
      ]
    })

    const tableData = computed(() => {
      return prefList.map((d) => {
        const cdArea = ('0000000000' + d.prefCode).slice(-2) + '000'
        return Object.assign(
          { prefName: d.prefName },
          ...chartData.value.map((d) => {
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
    })

    return {
      cardTitle,
      cardTitleId,
      cardRoutingPath,
      additionalDescription,
      lastUpdate,
      tableHeaders,
      tableData,
      series,
      canvas,
      source,
      displayData,
      chartComponent,

      topoJson: prefMap,
      selectedTime,
      selectedSeries,
      chartData,
      mapbar,
      times,
    }
  },
})
</script>
