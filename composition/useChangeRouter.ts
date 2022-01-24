import { Ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { City } from '~/types/resas'

export const useChangeRouter = () => {
  // パスパラメータの取得
  const router = useRouter()
  const { statField, menuId } = useRoute().value.params

  const changeRouterCity = (newCity: Ref<City>): void => {
    router.push(`/city/${newCity.value.cityCode}/${statField}/${menuId}`)
  }

  return {
    changeRouterCity,
  }
}
