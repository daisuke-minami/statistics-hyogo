import { computed, inject, useRoute } from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useStore'

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
  const { currentPref, currentCity } = State

  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { statField, menuId } = params

  const prefCode = computed(() => {
    return toFiveDigit(currentPref.value.prefCode)
  })

  const cityCode = computed(() => {
    return currentCity.value.cityCode
  })

  const getGovTabItems = computed((): TabItem[] => {
    return [
      {
        label: `都道府県の統計`,
        path: `/prefecture/${prefCode.value}/${statField}/${menuId}`,
      },
      {
        label: `市区町村の統計`,
        path: `/city/${cityCode.value}/${statField}/${menuId}`,
      },
    ]
  })

  return {
    getGovTabItems,
  }
}
