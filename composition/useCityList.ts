import { reactive, Ref } from '@nuxtjs/composition-api'
import masterCityList from '~/data/codes/citylist.json'
import { City, Pref } from '~/types/resas'

interface CityList {
  cityListAll: City[]
  cityListBigCityJoin: City[]
  cityListBigCitySplit: City[]
}

type Kind = 'all' | 'join' | 'split'

export const useCityList = () => {
  // state
  const state = reactive<CityList>({
    cityListAll: [],
    cityListBigCityJoin: [],
    cityListBigCitySplit: [],
  })

  // setter
  const setCityList = (currentPref: Ref<Pref>) => {
    const prefCode = currentPref.value.prefCode
    const cityListAll = masterCityList.result.filter(
      (f) => f.prefCode === prefCode
    )

    state.cityListAll = cityListAll
    state.cityListBigCityJoin = cityListAll.filter((f) => f.bigCityFlag !== '1')
    state.cityListBigCitySplit = cityListAll.filter(
      (f) => f.bigCityFlag !== '2'
    )
  }

  // getter
  const getCityList = (kind: Kind) => {
    if (kind === 'all') {
      return state.cityListAll
    } else if (kind === 'join') {
      return state.cityListBigCityJoin
    } else {
      return state.cityListBigCitySplit
    }
  }

  return {
    // ...toRefs(state),
    setCityList,
    getCityList,
  }
}
