import { computed, inject, useRoute } from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'

interface TabItem {
  label: string
  path: string
}

// prefCodeを5桁文字列に変換
function toFiveDigit(code: number): string {
  return ('0000000000' + code).slice(-2) + '000'
}

export const useGovType = () => {
  // inject
  const State = inject(StateKey)
  const { selectedPref, selectedCity } = State

  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { statField, menuId } = params

  const prefCode = toFiveDigit(selectedPref.value.prefCode)
  const cityCode = selectedCity.value.cityCode

  const getGovTabItems = computed((): TabItem[] => {
    return [
      {
        label: `都道府県の統計`,
        path: `/prefecture/${prefCode}/${statField}/${menuId}`,
      },
      {
        label: `市区町村の統計`,
        path: `/city/${cityCode}/${statField}/${menuId}`,
      },
    ]
  })

  return {
    getGovTabItems,
  }
}
