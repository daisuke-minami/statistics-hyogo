<template>
  <div>
    <static-card>
      <v-select
        v-model="innerSelectedCity"
        :items="innerCityList"
        item-text="cityName"
        item-value="cityCode"
        dense
        return-object
        @change="
          (value) => {
            changeRouter(value)
            setCurrentCity(value)
          }
        "
      />
    </static-card>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  toRefs,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useGlobalState'
import { useCity } from '~/composition/useCity'
import { City } from '~/types/resas'

interface State {
  innerCityList: City[]
  innerSelectedCity: City
}

export default defineComponent({
  setup() {
    // inject
    const GlobalState = inject(StateKey)
    const { setCurrentCity } = GlobalState

    // state
    const state = reactive<State>({
      innerCityList: [],
      innerSelectedCity: {},
    })

    // 初期値セット
    onMounted(() => {
      state.innerCityList = useCity().getCityList.value
      state.innerSelectedCity = useCity().selectedCity.value
    })

    // Router
    const router = useRouter()
    const { statField, menuId } = useRoute().value.params
    const changeRouter = computed(() => {
      return function (newCity: City) {
        const code = newCity.cityCode
        router.push(`/city/${code}/${statField}/${menuId}`)
      }
    })

    return {
      ...toRefs(state),
      changeRouter,
      setCurrentCity,
    }
  },
})
</script>
