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
              :target-id="contents.titleId"
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
import { getGraphSeriesStyle } from '@/utils/colors'

type Series = {
  name: string
  data: {
    x: number
    y: number
    unit: string
  }
  color: string
}

type Times = {
  yearInt: number
  yearStr: string
}

type Source = {
  name: string
  url: string
}

type Props = {
  contents: object
  routingPath: string
  selectedPref: object
  selectedCity: object
  governmentType: string
  title: string
  titleId: string
  annotation: string[]
}

export default defineComponent({
  props: {
    contents: {
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
    governmentType: {
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
  },
  setup(props: Props, context) {
    const canvas = ref<boolean>(true)

    const cdArea = computed((): string => {
      if (props.governmentType === 'city') {
        return props.selectedCity.cityCode
      } else {
        return ('0000000000' + props.selectedPref.prefCode).slice(-2) + '000'
      }
    })

    // eStat-APIからデータを取得
    const estatResponse = ref({})
    useFetch(async () => {
      const params = props.contents.estatParams
      params.cdArea = cdArea.value
      const { data } = await context.root.$estat.get(
        `${process.env.BASE_URL}/json/getStatsData`,
        { params }
      )
      estatResponse.value = data
    })

    // columnChartとlineChartの切替
    const columnline = ref<string>('column')
    const chartComponent = computed((): string => {
      const chartComponent =
        columnline.value === 'column' ? 'column-chart' : 'line-chart'
      return chartComponent
    })

    const source = computed((): Source => {
      const TABLE_INF =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
      return {
        name: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
        url: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
      }
    })

    const chartData = computed((): Series[] => {
      const series = props.contents.series
      const style = getGraphSeriesStyle(series.length)
      const value =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      return series.map((d, i) => {
        return {
          name: d.name,
          data: value
            .filter((f) => f[`@${d.id}`] === d.code)
            .map((d) => {
              return {
                x: parseInt(d['@time'].substr(0, 4)),
                y: parseFloat(d.$),
                unit: d['@unit'],
              }
            }),
          color: style[i].color,
        }
      })
    })

    // 注釈
    const estatCredit = ref<string>(
      'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません'
    )
    const additionalDescription = computed((): string[] => {
      return props.annotation.concat(estatCredit.value)
    })

    const displayInfo = computed(() => {
      const infoData = chartData.value[0]
      const length = infoData.data.length
      return {
        lText: infoData.data[length - 1].y.toLocaleString(),
        sText: infoData.data[length - 1].x + '年の' + infoData.name,
        unit: infoData.unit,
      }
    })

    const times = computed((): Times[] => {
      const CLASS_OBJ =
        estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ
      const classInfo = CLASS_OBJ.map((item) => {
        return {
          id: item['@id'],
          data: item.CLASS,
        }
      })
      return classInfo
        .find((f) => f.id === 'time')
        .data.map((d) => {
          return {
            yearInt: parseInt(d['@code'].substr(0, 4)),
            yearStr: d['@code'],
          }
        })
    })

    // テーブル
    const tableHeaders = computed(() => {
      return [
        { text: '年', value: 'year', width: '80px' },
        ...chartData.value.map((d) => {
          return {
            text: d.name,
            value: d.name,
            align: 'center',
            width: '100px',
          }
        }),
      ]
    })
    const tableData = computed(() => {
      return times.value.map((d) => {
        return Object.assign(
          { year: `${d.yearInt}年` },
          ...chartData.value.map((item) => {
            const value = item.data.find((f) => f.x === d.yearInt)
            if (value) {
              return {
                [item.name]: value.y.toLocaleString() + item.unit,
              }
            } else {
              return ''
            }
          })
        )
      })
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
