import { computed, reactive, toRefs } from '@nuxtjs/composition-api'
import { City } from '@/types/resas'
import { usePrefecture } from '@/composition/usePrefecture'
import cityListAll from '~/data/codes/citylist.json'

interface State {
  cityList: City[]
  cityListBigCityJoin: City[]
  // cityListBigCitySplit: City[]
  // selectedCity: City
}

const _cityList = (prefCode: number) => {
  const arr = cityListAll.result
  return arr.filter((f) => f.prefCode === prefCode)
}

const _cityListBigCityJoin = (prefCode: number) => {
  const arr = cityListAll.result
  return arr
    .filter((f) => f.prefCode === prefCode)
    .filter((f) => f.bigCityFlag !== '1')
}

export const useCityList = () => {
  // 都道府県
  const { selectedPref } = usePrefecture()

  // 市区町村リストの取得
  const getCityList = computed((isBigCity: boolean = true) => {
    if (isBigCity) {
      // 政令指定都市統合
      return state.cityList.filter((f) => f.bigCityFlag !== '1')
    } else {
      // 政令指定都市分割
      return state.cityList.filter((f) => f.bigCityFlag !== '2')
    }
  })

  // State
  const state = reactive<State>({
    cityList: _cityList(selectedPref.value.prefCode),
    cityListBigCityJoin: _cityListBigCityJoin(selectedPref.value.prefCode),
    // cityListBigCitySplit: getCityList.value(false),
  })

  return {
    ...toRefs(state),
    getCityList,
  }
}
