import { computed, inject, Ref, useRoute } from '@nuxtjs/composition-api'
import {
  EstatState,
  VALUE,
  EstatTimes,
  EstatSeries,
  EstatResponse,
} from '@/types/estat'
import { GlobalState, StateKey } from './useGlobalState'

export const useEstatCityRankChart = (
  estatState: EstatState,
  estatResponse: Ref<EstatResponse>,
  currentSeries: Ref<EstatSeries>,
  currentTime: Ref<EstatTimes>,
  currentBigCityKind: Ref<string>,
  selectedValueType: Ref<string>,
  totalPopulationData: Ref<[]>,
  totalAreaData: Ref<[]>
) => {
  // 市区町村の設定
  const { currentCity, getCurrentCityList } = inject(StateKey) as GlobalState
  const cityList = computed(() => {
    return getCurrentCityList(currentBigCityKind.value)
  })

  // title
  const { getTitle } = inject(StateKey) as GlobalState
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

  const getValuePerPopulation = (d: VALUE) => {
    const totalPopulation = totalPopulationData.value
      .filter((f) => f.code === d['@area'])
      .filter((f) => f.yearStr === d['@time'])
    return Math.round((parseInt(d.$) / totalPopulation[0].value) * 100) / 100
  }

  const getValuePerArea = (d: VALUE) => {
    const totalArea = totalAreaData.value
      .filter((f) => f.code === d['@area'])
      .filter((f) => f.yearStr === d['@time'])
    return Math.round((parseInt(d.$) / totalArea[0].value) * 100) / 100
  }

  // e-statのレスポンスをSeries,Timeでフィルタリング
  const currentValue = computed(() => {
    const value: VALUE[] =
      estatResponse.value.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
    const key: keyof VALUE = `@${currentSeries.value.id}`
    return value
      .filter((f) => f['@time'] === currentTime.value.yearStr)
      .filter((f) => f[key] === currentSeries.value.code)
  })

  // 合計値、単位人口当たり、単位面積当たりの値に変換
  const convertedCurrentValue = computed(() => {
    const type = selectedValueType.value
    if (type === 'population') {
      return currentValue.value.map((d) => {
        return {
          code: d['@area'],
          value: getValuePerPopulation(d),
          unit: d ? `${d['@unit']}/人` : '',
        }
      })
    } else if (type === 'area') {
      return currentValue.value.map((d) => {
        return {
          code: d['@area'],
          value: getValuePerArea(d),
          unit: d ? `${d['@unit']}/ha` : '',
        }
      })
    } else {
      return currentValue.value.map((d) => {
        return {
          code: d['@area'],
          value: parseInt(d.$),
          unit: d ? d['@unit'] : '',
        }
      })
    }
  })

  // 順位を付与
  const withRankingData = computed(() => {
    let rank = 1
    return convertedCurrentValue.value
      .sort((a, b) => {
        if (a.value > b.value) return -1
        if (a.value < b.value) return 1
        return 0
      })
      .reduce((pre, cur, i, arr) => {
        if (i !== 0 && cur.value !== arr[i - 1].value) {
          rank = rank + 1
        }

        pre.push(Object.assign(cur, { rank }))
        return pre
      }, [])
  })

  // displayData
  const displayData = computed(() => {
    return [
      {
        name: currentSeries.value.name,
        data: cityList.value.map((d) => {
          const data = withRankingData.value.find((f) => f.code === d.cityCode)

          return Object.assign(
            { cityCode: d.cityCode, cityName: d.cityName },
            data
          )
        }),
      },
    ]
  })

  const displayInfo = computed(() => {
    const data = withRankingData.value.find(
      (f) => f.code === currentCity.value.cityCode
    )

    return {
      title: '県内 第',
      lText: data.rank,
      sText: '',
      unit: '位',
    }
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
    displayInfo,
    tableHeader,
    tableData,
    additionalDescription,
    source,
    lastUpdate,
  }
}
