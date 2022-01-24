import {
  computed,
  reactive,
  toRefs,
  useRoute,
  // useRouter,
} from '@nuxtjs/composition-api'
import { City } from '@/types/resas'
import { usePrefecture } from '@/composition/usePrefecture'
import cityListAll from '~/data/codes/citylist.json'

interface State {
  cityList: City[]
  selectedCity: City
}

const _cityList = (prefCode: number) => {
  const arr = cityListAll.result
  return arr.filter((f) => f.prefCode === prefCode)
}
const _city = (cityCode: string) => {
  const arr = cityListAll.result
  return arr.find((f) => f.cityCode === cityCode) ?? arr[arr.length - 1]
}

export const useCity = () => {
  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { code } = params

  // 都道府県
  const { selectedPref } = usePrefecture()

  // State
  const state = reactive<State>({
    cityList: _cityList(selectedPref.value.prefCode),
    selectedCity: _city(code),
  })

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

  const setSelectedCity = computed(() => {
    return function (selectedCity: City) {
      state.selectedCity = selectedCity
    }
  })

  // 市区町村ルーティング
  // const router = useRouter()
  // const changeRouter = computed(() => {
  //   return function (selectedCity: City) {
  //     const code = selectedCity.cityCode
  //     router.push(`/city/${code}/${statField}/${menuId}`)
  //   }
  // })

  return {
    ...toRefs(state),
    getCityList,
    setSelectedCity,
    // changeRouter,
  }
}
