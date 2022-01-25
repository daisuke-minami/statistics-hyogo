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
import { useCityList } from '~/composition/useCityList'
import { City } from '~/types/resas'
import { StateKey } from '~/composition/useGlobalState'

export default defineComponent({
  setup() {
    const { cityListBigCityJoin } = useCityList()

    const State = inject(StateKey)
    const { currentCity } = State

    const selectedCity = ref<City>(currentCity)

    // 市区町村を変更した場合の処理
    watch(selectedCity, () => changeCity())
    const { changeRouterCity } = useChangeRouter()
    const changeCity = () => {
      changeRouterCity.value(selectedCity)
    }
    return {
      cityList: cityListBigCityJoin,
      selectedCity,
    }
  },
})
</script>
