import { reactive } from '@nuxtjs/composition-api'
import { useEstatApi } from '@/composition/useEstatApi'
import { EstatParams, EstatResponse, VALUE } from '~/types/estat'
import { City } from '~/types/resas'
// import { useCityList } from '@/composition/useCityList'

interface PopulationData {
  code: string
  yearNum: number
  value: number
  unit: string
}

export const useTotalPopulation = (axios: any) => {
  // 都道府県の人口
  const params = reactive<EstatParams>({
    statsDataId: '0000010101',
    cdCat01: ['A1101'],
  })
  const getPrefecture = async () => {
    const res = await useEstatApi(axios, params).getData()
    return _formatPopulationData(res)
  }

  // 市区町村の総人口
  const paramsCity = reactive<EstatParams>({
    statsDataId: '0000020201',
    cdCat01: ['A1101'],
  })
  const getCity = async (cityList: City[]) => {
    paramsCity.cdArea = cityList.map((d) => d.cityCode)
    const res = await useEstatApi(axios, paramsCity).getData()
    return _formatPopulationData(res)
  }

  return {
    getPrefecture,
    getCity,
  }
}

/**
 * 都道府県・市区町村の総人口を返却
 * @param response - estat-APIのレスポンス
 */
const _formatPopulationData = (response: EstatResponse): PopulationData[] => {
  const value: VALUE[] = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  return value.map((d) => {
    return {
      code: d['@area'],
      yearNum: parseInt(d['@time'].substring(0, 4)),
      value: parseInt(d.$),
      unit: d['@unit'],
    }
  })
}
