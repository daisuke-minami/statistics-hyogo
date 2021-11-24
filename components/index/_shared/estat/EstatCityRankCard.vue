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

            <toggle-big-city v-model="bigcityKind" />
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
// import { mdiChartBar, mdiDatabaseCog } from '@mdi/js'
import axios from 'axios'
import {
  defineComponent,
  ref,
  computed,
  useFetch,
  useStore,
} from '@nuxtjs/composition-api'
import { EstatParams } from '@/utils/formatEstat'
import { GovType } from '@/store/setting'
import { City } from '~/store/cityList'
import { Pref } from '~/store/prefList'

// MapChart
const MapChart = () => {
  return import('@/components/index/_shared/highcharts/MapChartCity.vue')
}
// BarChart
const BarChart = () => {
  return import('@/components/index/_shared/highcharts/BarChart.vue')
}

export default defineComponent({
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const canvas = ref<boolean>(true)

    // ストアから市区町村リストを取得
    const store = useStore()
    const cityList = computed(
      (): City[] => store.getters['cityList/getCityList']
    )

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
      return `${name}の${props.contents.title}Rank`
    })
    const titleId = computed((): string => {
      return props.contents.titleId
    })

    // eStat-APIからデータを取得
    const estatParams = computed((): EstatParams => {
      const params = props.contents.estatParams
      params.cdArea = cityList.value.map((d) => d.cityCode)
      return params
    })

    const estatResponse = ref({})
    const cityMapDc = ref({})
    const cityMap = ref({})
    useFetch(async () => {
      const params: EstatParams = estatParams.value
      const { data: res } = await context.root.$estat.get(
        `${process.env.BASE_URL}/json/getStatsData`,
        { params }
      )
      estatResponse.value = res

      const { data: topoDc } = await axios.get(
        'https://geoshape.ex.nii.ac.jp/city/topojson/20200101/28/28_city_dc.l.topojson'
      )
      cityMapDc.value = topoDc

      const { data: topo } = await axios.get(
        'https://geoshape.ex.nii.ac.jp/city/topojson/20200101/28/28_city.l.topojson'
      )
      cityMap.value = topo
    })

    // MapChartとBarChartの切替
    const mapbar = ref<string>('map')
    const chartComponent = computed((): string => {
      const chartComponent = mapbar.value === 'map' ? MapChart : BarChart
      return chartComponent
    })

    const bigcityKind = ref<string>('all')
    const topoJson = computed(() => {
      if (bigcityKind.value === 'all') {
        return cityMapDc.value
      } else {
        return cityMap.value
      }
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
      return props.contents.annotation
    })
    const additionalDescription = computed((): string[] => {
      return annotation.value.concat(estatCredit.value)
    })

    // 動的ルーティングのパス
    const routingPath = computed((): string => {
      return `${props.contents.routingPath}/Rankchart`
    })

    const chartData = computed(() => {
      const value =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      return times.value.map((d) => {
        const v = value.filter((f) => f['@time'] === d.yearStr)
        return {
          year: d.yearInt,
          name: title.value,
          data: cityList.value.map((d) => {
            const data = v.find((f) => f['@area'] === d.cityCode)
            if (data) {
              return {
                cityCode: d.cityCode,
                cityName: d.cityName,
                value: parseInt(data.$),
                unit: data['@unit'],
              }
            } else {
              return {
                cityCode: d.cityCode,
                cityName: d.cityName,
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
        { text: '市区町村名', value: 'cityName', width: '80px' },
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
      return cityList.value.map((d) => {
        const cityCode = d.cityCode
        return Object.assign(
          { cityName: d.cityName },
          ...chartData.value.map((d) => {
            const data = d.data.find((f) => f.cityCode === cityCode)
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
      routingPath,
      bigcityKind,
      lastUpdate,
      tableHeaders,
      tableData,
      canvas,
      source,
      displayData,
      chartComponent,
      title,
      topoJson,
      titleId,
      targetYear,
      chartData,
      mapbar,
      times,
    }
  },
})
</script>
