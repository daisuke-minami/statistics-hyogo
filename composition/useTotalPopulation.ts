import { reactive, Ref } from '@nuxtjs/composition-api'
import { useResasApi } from '@/composition/useResasApi'
import { EstatParams } from '~/types/estat'
import { City } from '~/types/resas'

type PopulationData = {
  yearInt: number
  value: number
}

type ResasResponse = {
  message: string
  result: {
    boundaryYear: number
    data: {
      label: string
      data: {
        year: number
        value: number
      }[]
    }[]
  }
}

export const useTotalPopulation = (axios: any) => {
  // 都道府県の人口
  const params = reactive<EstatParams>({
    statsDataId: '0000010101',
    cdCat01: ['A1101'],
  })
  const getPrefecture = async () => {
    const res = await useResasApi(axios, params).getData()
    return _formatPopulationData(res)
  }

  /**
   * 市区町村の総人口 estat-APIは5年毎のデータなので、resas-APIを利用
   */
  const getCity = async (cityList: Ref<City[]>) => {
    return await Promise.all(
      cityList.value.map(async (d) => {
        const data = await getPopulationCity(d.cityCode)
        // console.log(data)
        return {
          cityName: d.cityName,
          cityCode: d.cityCode,
          totalPopulation: data,
        }
      })
    )
  }

  const getPopulationCity = async (cityCode: string) => {
    const url = '/v1/population/composition/perYear'
    const params = { prefCode: 28, cityCode }

    const res = await useResasApi(axios).getData(url, params)
    return _formatPopulationData(res)
  }

  return {
    getPrefecture,
    getCity,
  }
}

/**
 * 総人口データを返却
 * @param response - resas-APIのレスポンス
 */
const _formatPopulationData = (response: ResasResponse) => {
  return response.result.data[0].data.map((d) => {
    return {
      yearInt: d.year,
      value: d.value,
    }
  })
}

/**
 * 都道府県・市区町村の総人口を返却
 * @param response - estat-APIのレスポンス
 */
// const _formatPopulationData = (response: EstatResponse): PopulationData[] => {
//   const value: VALUE[] = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
//   return value.map((d) => {
//     return {
//       code: d['@area'],
//       yearNum: parseInt(d['@time'].substring(0, 4)),
//       value: parseInt(d.$),
//       unit: d['@unit'],
//     }
//   })
// }
