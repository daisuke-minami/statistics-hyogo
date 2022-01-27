import { reactive } from '@nuxtjs/composition-api'
import { useEstatApi } from '@/composition/useEstatApi'
import { EstatParams, EstatResponse, VALUE } from '~/types/estat'

interface PopulationData {
  code: string
  yearNum: number
  value: number
  unit: string
}

export const useTotalPopulation = (axios: any) => {
  const params = reactive<EstatParams>({
    statsDataId: '0000010101',
    cdCat01: ['A1101'],
  })

  const getPrefecture = async () => {
    const res = await useEstatApi(axios, params).getData()
    return _formatPopulationData(res)
  }

  return {
    getPrefecture,
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
