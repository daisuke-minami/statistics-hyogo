import {
  computed,
  inject,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { PageStateKey } from '@/composition/pageState'
import { City } from '@/types/resas'
import cityListAll from '~/data/codes/citylist.json'

export const useCity = (isBigCity: boolean = true) => {
  const pageState = inject(PageStateKey)
  const { selectedPref } = pageState

  const selectedCity = ref<object>(pageState?.selectedCity?.value)
  const route = useRoute()
  const { statField, menuTitleId } = route.value.params

  // 市区町村一覧の取得
  const getCityList = computed(() => {
    const all = cityListAll.result.filter(
      (f) => f.prefCode === selectedPref.value.prefCode
    )
    if (isBigCity) {
      // 政令指定都市統合
      return all.filter((f) => f.bigCityFlag !== '1')
    } else {
      // 政令指定都市分割
      return all.filter((f) => f.bigCityFlag !== '2')
    }
  })

  // 市区町村ルーティング
  const router = useRouter()
  const changeRouter = computed(() => {
    return function (selectedCity: City) {
      const code = selectedCity.cityCode
      router.push(`/${code}/${statField}/${menuTitleId}`)
    }
  })

  return {
    getCityList,
    changeRouter,
    selectedCity,
  }
}
