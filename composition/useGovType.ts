import { computed, inject } from '@nuxtjs/composition-api'
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
  const { selectedPref, selectedCity, statField, menuId } = State

  const prefCode = toFiveDigit(selectedPref.value.prefCode)
  const cityCode = selectedCity.value.cityCode

  const getGovTabItems = computed((): TabItem[] => {
    return [
      {
        label: `都道府県の統計`,
        path: `/prefecture/${prefCode}/${statField.value}/${menuId.value}`,
      },
      {
        label: `市区町村の統計`,
        path: `/city/${cityCode}/${statField.value}/${menuId.value}`,
      },
    ]
  })

  return {
    getGovTabItems,
  }
}
