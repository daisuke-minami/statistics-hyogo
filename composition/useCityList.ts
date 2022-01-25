import { computed, inject } from '@nuxtjs/composition-api'
import { StateKey } from './useGlobalState'
import masterCityList from '~/data/codes/citylist.json'

export const useCityList = () => {
  // 都道府県
  const { currentPref } = inject(StateKey)
  const prefCode = computed(() => currentPref.value.prefCode)

  const cityListAll = computed(() => {
    return masterCityList.result.filter((f) => f.prefCode === prefCode.value)
  })

  const cityListBigCityJoin = computed(() => {
    return cityListAll.value.filter((f) => f.bigCityFlag !== '1')
  })

  const cityListBigCitySplit = computed(() => {
    return cityListAll.value.filter((f) => f.bigCityFlag !== '2')
  })

  return {
    cityListAll,
    cityListBigCityJoin,
    cityListBigCitySplit,
  }
}
