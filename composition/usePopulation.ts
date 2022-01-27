import { reactive } from '@nuxtjs/composition-api'
import { useEstatApi } from '@/composition/useEstatApi'
// import { StateKey } from './useGlobalState'
import { EstatParams } from '~/types/estat'

export const usePopulation = (axios: any) => {
  const params = reactive<EstatParams>({
    statsDataId: '0000010101',
    cdCat01: ['A1101'],
  })

  const getPopulationPrefecture = async () => {
    return await useEstatApi(axios, params).getData()
  }

  return {
    getPopulationPrefecture,
  }
}
