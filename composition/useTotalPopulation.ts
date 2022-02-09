import { useEstatApi } from '@/composition//useEstatApi'
import { convertPrefCodeToString } from '@/composition/utils/formatEstat'
import { EstatParams, EstatResponse, VALUE } from '~/types/estat'
import { City, Pref } from '~/types/resas'

export type TotalPopulationData = {
  code: string
  yearInt: number
  yearStr: string
  value: number
  unit: string
}

export const useTotalPopulation = (axios: any) => {
  /**
   * 都道府県の総人口
   */
  const getPrefecture = async (prefList: Pref[]) => {
    const params: EstatParams = {
      statsDataId: '0000010101',
      cdCat01: ['A1101'],
      cdArea: prefList.map((d) => convertPrefCodeToString(d.prefCode)),
    }
    const res = await useEstatApi(axios, params).getData()
    return _formatPopulationData(res)
  }

  /**
   * 市区町村の総人口
   */
  const getCity = async (cityList: City[]) => {
    const params: EstatParams = {
      statsDataId: '0000020201',
      cdCat01: ['A1101'],
      cdArea: cityList.map((d) => d.cityCode),
    }
    const res = await useEstatApi(axios, params).getData()
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
const _formatPopulationData = (
  response: EstatResponse
): TotalPopulationData[] => {
  const value: VALUE[] = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  return value.map((d) => {
    return {
      code: d['@area'],
      yearInt: parseInt(d['@time'].substring(0, 4)),
      yearStr: d['@time'],
      value: parseInt(d.$),
      unit: d['@unit'],
    }
  })
}
