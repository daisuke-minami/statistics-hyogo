import { computed, inject, Ref, useRoute } from '@nuxtjs/composition-api'
import {
  EstatState,
  VALUE,
  EstatTimes,
  EstatSeries,
  EstatResponse,
} from '@/types/estat'
import { useCityList } from '@/composition/useCityList'
import { StateKey } from './useGlobalState'

export const useEstatCityRankChart = (
  estatState: EstatState,
  estatResponse: Ref<EstatResponse>,
  currentSeries: Ref<EstatSeries>,
  currentTime: Ref<EstatTimes>,
  currentBigCityKind: Ref<string>,
  selectedValueType: Ref<string>,
  totalPopulationData: Ref<[]>
) => {
  // e-statのレスポンスをSeries,Timeでフィルタリング
  const currentValue = computed(() => {
    const value: VALUE[] =
      estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
    const key: keyof VALUE = `@${currentSeries.value.id}`
    return value
      .filter((f) => f['@time'] === currentTime.value.yearStr)
      .filter((f) => f[key] === currentSeries.value.code)
  })

  // 市区町村リストを取得
  const { getCityList } = useCityList()
  const cityList = computed(() => {
    return getCityList(currentBigCityKind.value)
  })

  // title
  const { getTitle } = inject(StateKey)
  const title = computed(() => {
    return getTitle(estatState.title)
  })

  // titleId
  const titleId = estatState.titleId

  // path
  const route = useRoute()
  const path = computed(() => {
    return `${route.value.path}/${titleId}/`
  })

  // times
  const times = computed(() => {
    const value =
      estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
    return Array.from(new Set(value.map((d) => d['@time'])))
      .map((d) => {
        return {
          yearInt: parseInt(d.substr(0, 4)),
          yearStr: d,
          yearName: `${d.substr(0, 4)}年`,
        }
      })
      .sort((a, b) => {
        if (a.yearStr > b.yearStr) return -1
        if (a.yearStr < b.yearStr) return 1
        return 0
      })
  })

  const convertData = (data) => {
    const type = selectedValueType.value
    const population = totalPopulationData.value
      .filter((f) => f.code === data['@area'])
      .filter((f) => f.yearStr === data['@time'])

    if (type === 'population') {
      return {
        value: data ? parseInt(data.$) / population[0].value : '',
        unit: data ? data['@unit'] : '',
      }
    } else {
      return {
        value: data ? parseInt(data.$) : '',
        unit: data ? data['@unit'] : '',
      }
    }
  }

  // displayData
  const displayData = computed(() => {
    return [
      {
        name: currentSeries.value.name,
        data: cityList.value.map((d) => {
          const data = currentValue.value.find((f) => f['@area'] === d.cityCode)

          return Object.assign(
            { cityCode: d.cityCode, cityName: d.cityName },
            convertData(data)
          )
        }),
      },
    ]
  })

  // tableHeader
  const tableHeader = computed(() => [
    { text: '市区町村名', value: 'cityName', width: '40px' },
    {
      text: `${currentSeries.value.name} [${currentTime.value.yearName}]`,
      value: 'value',
      width: '100px',
    },
  ])

  // tableData
  const tableData = computed(() => {
    return cityList.value.map((d) => {
      const data = currentValue.value.find((f) => f['@area'] === d.cityCode)
      return {
        cityName: d.cityName,
        value: `${parseInt(data.$).toLocaleString()}${data['@unit']}`,
      }
    })
  })

  // 注釈
  const additionalDescription = computed(() => {
    const estatCredit: string[] = [
      'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
    ]
    const codhCredit: string[] = ['歴史的行政区域データセットβ版（CODH作成）']

    return estatState.annotation.concat(estatCredit, codhCredit)
  })

  // 出典
  const source = computed(() => {
    const TABLE_INF =
      estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
    return {
      estatName: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
      estatUrl: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
    }
  })

  // 最終更新日
  const lastUpdate = computed(() => {
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
    path,
    times,
    displayData,
    tableHeader,
    tableData,
    additionalDescription,
    source,
    lastUpdate,
  }
}
