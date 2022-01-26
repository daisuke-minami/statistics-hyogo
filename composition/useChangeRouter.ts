import {
  computed,
  inject,
  Ref,
  useRoute,
  useRouter,
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
  const { currentGovType, currentCode } = inject(StateKey)

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

  return {
    changeRouterCity,
    getSideNaviLink,
  }
}
