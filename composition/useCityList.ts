import { computed, useRoute } from '@nuxtjs/composition-api'
import masterCityList from '~/data/codes/citylist.json'

export const useCityList = () => {
  // paramsからprefCode,cityCodeを取得
  const { code } = useRoute().value.params
  const cityCode = code
  // const prefCode = parseInt(code.slice(0, 2))

  const cityListAll = computed(() => {
    return masterCityList.result.filter((f) => f.prefCode === 28)
  })

  const cityListBigCityJoin = computed(() => {
    return cityListAll.value.filter((f) => f.bigCityFlag !== '1')
  })

  const cityListBigCitySplit = computed(() => {
    return cityListAll.value.filter((f) => f.bigCityFlag !== '2')
  })

  const selectedCity = computed(() => {
    return masterCityList.result.find((d) => d.cityCode === cityCode)
  })

  // getter
  const getCityList = (kind) => {
    if (kind === 'all') {
      return cityListAll
    } else if (kind === 'join') {
      return cityListBigCityJoin
    } else {
      return cityListBigCitySplit
    }
  }

  const getCity = (code: string) => {
    return cityListAll.value.find((f) => f.cityCode === code)
  }

  return {
    getCityList,
    getCity,
    selectedCity,
  }
}
