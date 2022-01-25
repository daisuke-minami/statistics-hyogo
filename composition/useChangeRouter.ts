import { computed, Ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { City } from '~/types/resas'
// import { StateKey } from '@/composition/useGlobalState'

export const useChangeRouter = () => {
  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { govType, statField, menuId } = params

  const router = useRouter()

  const changeRouterCity = computed(() => {
    return function (newCity: Ref<City>) {
      router.push(
        `/${govType}/${newCity.value.cityCode}/${statField}/${menuId}`
      )
    }
  })

  return {
    changeRouterCity,
  }
}
