import { computed, inject } from '@nuxtjs/composition-api'
import { PageStateKey } from '@/composition/pageState'
import cityListAll from '~/data/codes/citylist.json'

export const useCityList = (isBigCity: boolean = true) => {
  const pageState = inject(PageStateKey)
  const { selectedPref } = pageState

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

  return {
    getCityList,
  }
}
