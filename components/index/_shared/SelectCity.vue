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
import { StateKey } from '@/composition/useStore'
import { useChangeRouter } from '@/composition/useChangeRouter'
import { useCityList } from '~/composition/useCityList'
import { City } from '~/types/resas'

export default defineComponent({
  setup() {
    // 市区町村リスト
    const { cityListBigCityJoin } = useCityList()
    const cityList = ref<City[]>(cityListBigCityJoin.value)

    // 市区町村
    const { currentCity } = inject(StateKey)
    const selectedCity = ref<City>(currentCity.value)

    // 市区町村を変更した場合の処理
    const { setCurrentCity } = inject(StateKey)
    const { changeRouterCity } = useChangeRouter()
    watch(selectedCity, () => {
      setCurrentCity(selectedCity)
      changeRouterCity(selectedCity)
    })

    return {
      cityList,
      selectedCity,
    }
  },
})
</script>
