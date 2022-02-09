<template>
  <div>
    <static-card>
      <v-select
        v-model="selectedCity"
        :items="cityList"
        item-text="cityName"
        item-value="cityCode"
        dense
        return-object
      />
    </static-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from '@nuxtjs/composition-api'
import { useChangeRouter } from '@/composition/useChangeRouter'
import { City } from '~/types/resas'
import { StateKey, GlobalState } from '~/composition/useGlobalState'

export default defineComponent({
  setup() {
    // globalState
    const { currentCity, getCurrentCityList } = inject(StateKey) as GlobalState

    // 市区町村リストの設定
    const cityList = getCurrentCityList('join')

    const selectedCity = ref<City>(currentCity)

    // 市区町村を変更した場合の処理
    watch(selectedCity, () => changeCity())
    const { changeRouterCity } = useChangeRouter()
    const changeCity = () => {
      changeRouterCity.value(selectedCity)
    }
    return {
      cityList,
      selectedCity,
    }
  },
})
</script>
