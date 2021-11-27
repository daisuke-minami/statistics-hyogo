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

            <toggle-map-bar v-model="mapbar" />

            <v-select
              v-model="targetYear"
              :items="times"
              item-text="yearName"
              item-value="yearInt"
              @change="$emit('input', $event)"
            />

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
  useFetch,
  useStore,
  // toRefs,
} from '@nuxtjs/composition-api'
// import { EstatParams } from '@/utils/formatEstat'
import { GovType } from '@/store/setting'
import { City } from '~/store/cityList'
import { Pref } from '~/store/prefList'

// MapChart
const MapChart = () => {
  return import('@/components/index/_shared/highcharts/MapChartPref.vue')
}
// BarChart
const BarChart = () => {
  return import('@/components/index/_shared/highcharts/BarChart.vue')
}

export default defineComponent({
  props: {
    series: {
      type: Array,
      required: true,
    },
    estatParams: {
      type: Object,
      required: true,
    },
    routingPath: {
      type: String,
      required: true,
    },
    selectedPref: {
      type: Object,
      required: true,
    },
    selectedCity: {
      type: Object,
      required: true,
    },
    govType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleId: {
      type: String,
      required: true,
    },
    annotation: {
      type: Array,
      required: true,
    },
    latestYearInt: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const canvas = ref<boolean>(true)

    // ストアから都道府県リストを取得
    const store = useStore()
    const prefList = computed(
      (): Pref[] => store.getters['prefList/getPrefList']
    )
    const prefMap = computed(() => store.getters['topojson/getMapPref'])

    // 都道府県・市区町村情報
    const selectedPref = computed((): Pref => {
      return props.selectedPref
    })
    const selectedCity = computed((): City => {
      return props.selectedCity
    })
    const govType = computed((): GovType => {
      return props.govType
    })

    // タイトルの設定
    const name =
      govType.value === 'prefecture'
        ? selectedPref.value.prefName
        : selectedCity.value.cityName

    const title = computed((): string => {
      return `${name}の${props.title}Rank`
    })
    // const titleId = computed((): string => {
    //   return props.titleId
    // })

    // eStat-APIからデータを取得
    const estatResponse = ref({})
    useFetch(async () => {
      const params = Object.assign({}, props.estatParams)
      params.cdArea = prefList.value.map(
        (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
      )
      const { data: res } = await context.root.$estat.get(`getStatsData`, {
        params,
      })
      // console.log('RankChart内', res)
      estatResponse.value = res
    })
    // console.log('RankChart外', estatResponse.value)

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

    const targetYear = ref<number>(2015)

    // 注釈
    const estatCredit = ref<string>(
      'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません'
    )
    const annotation = computed((): string[] => {
      return props.annotation
    })
    const additionalDescription = computed((): string[] => {
      return annotation.value.concat(estatCredit.value)
    })

    // 動的ルーティングのパス
    // const routingPath = computed((): string => {
    //   return `${props.routingPath}/Rankchart`
    // })

    const chartData = computed(() => {
      const value =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      // console.log('value', value)
      return times.value.map((d) => {
        const v = value.filter((f) => f['@time'] === d.yearStr)
        return {
          year: d.yearInt,
          name: title.value,
          data: prefList.value.map((d) => {
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

    const displayData = computed(() => {
      return chartData.value.filter((f) => f.year === targetYear.value)
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
      return prefList.value.map((d) => {
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
      additionalDescription,
      lastUpdate,
      tableHeaders,
      tableData,
      canvas,
      source,
      displayData,
      chartComponent,
      topoJson: prefMap,
      targetYear,
      chartData,
      mapbar,
      times,
    }
  },
})
</script>
