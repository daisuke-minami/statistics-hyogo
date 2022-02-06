import {
  computed,
  inject,
  Ref,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { useContents } from '@/composition/useContents'
import { StateKey } from './useGlobalState'
import { City } from '~/types/resas'
// import { StateKey } from '@/composition/useGlobalState'

export const useChangeRouter = () => {
  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { govType, statField, menuId } = params

  // inject
  const { currentGovType, currentCode, currentPref, currentCity } =
    inject(StateKey)

  watch(currentGovType, () => {
    // console.log({ currentGovType })
  })

  const router = useRouter()

  const changeRouterCity = computed(() => {
    return function (newCity: Ref<City>) {
      router.push(
        `/${govType}/${newCity.value.cityCode}/${statField}/${menuId}`
      )
    }
  })

  const getSideNaviLink = computed(() => {
    return function (statField: string) {
      const { getInitMenuId } = useContents()
      const path = `/${currentGovType.value}/${currentCode.value}/${statField}`
      const menuId = getInitMenuId.value(statField)
      return currentGovType.value === 'prefecture'
        ? `${path}/${menuId.prefecture}`
        : `${path}/${menuId.city}`
    }
  })

  const prefCode = toFiveDigit(currentPref.value.prefCode)
  const cityCode = currentCity.value.cityCode

  // 都道府県・市区町村タブのpath設定
  const getGovTabLink = computed(() => {
    return function (govType: string) {
      return govType === 'prefecture'
        ? `/prefecture/${prefCode}/${statField}/${menuId}`
        : `/city/${cityCode}/${statField}/${menuId}`
    }
  })

  return {
    changeRouterCity,
    getSideNaviLink,
    getGovTabLink,
  }
}

// prefCodeを5桁文字列に変換
function toFiveDigit(code: number): string {
  return ('0000000000' + code).slice(-2) + '000'
}
