import { Ref } from '@nuxtjs/composition-api'
// import { useResasApi } from '@/composition/useResasApi'
import { useEstatApi } from '@/composition//useEstatApi'
import { EstatParams } from '~/types/estat'
import { City } from '~/types/resas'

export const useTotalArea = (axios: any) => {
  // 都道府県の人口
  // const params = reactive<EstatParams>({
  //   statsDataId: '0000010101',
  //   cdCat01: ['A1101'],
  // })
  // const getPrefecture = async () => {
  //   const res = await useResasApi(axios, params).getData()
  //   return _formatPopulationData(res)
  // }

  /**
   * 市区町村の総人口
   */
  const getCity = async (cityList: Ref<City[]>) => {
    const params: EstatParams = {
      statsDataId: '0000020202',
      cdCat01: ['B1101'],
      cdArea: cityList.value.map((d) => d.cityCode),
    }
    const res = await useEstatApi(axios, params).getData()
    return _formatAreaData(res)
  }

  return {
    // getPrefecture,
    getCity,
  }
}

/**
 * 都道府県・市区町村の総人口を返却
 * @param response - estat-APIのレスポンス
 */
const _formatAreaData = (response: EstatResponse) => {
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
