import {
  computed,
  inject,
  Ref,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { useContents } from '@/composition/useContents'
import { convertPrefCodeToCode } from '@/composition/utils/formatResas'
import { GlobalState, StateKey } from './useGlobalState'
import { City } from '~/types/resas'

export const useChangeRouter = () => {
  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { govType, statField, menuId } = params

  // inject
  const { currentGovType, currentCode, currentPref, currentCity } = inject(
    StateKey
  ) as GlobalState

  // console.log({ currentGovType, currentCode, currentPref, currentCity })

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

  const changeRoute = (code: string): void => {
    router.push(`/${govType}/${code}/${statField}/${menuId}`)
  }

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

  const prefCode = convertPrefCodeToCode(currentPref.value.prefCode)
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
    changeRoute,
    getSideNaviLink,
    getGovTabLink,
  }
}
