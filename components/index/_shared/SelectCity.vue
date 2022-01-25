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
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { useChangeRouter } from '@/composition/useChangeRouter'
import { useCityList } from '~/composition/useCityList'
import { City } from '~/types/resas'

export default defineComponent({
  setup() {
    const { cityListBigCityJoin } = useCityList()

    // const selectedCity = useCityList().selectedCity.value
    const selectedCity = ref<City>({})
    // const changeRoute = useCityList().changeRouter.value

    // 市区町村を変更した場合の処理
    watch(selectedCity, () => changeCity())
    const { changeRouterCity } = useChangeRouter()
    const changeCity = () => {
      changeRouterCity.value(selectedCity)
    }
    return {
      cityList: cityListBigCityJoin,
      selectedCity,
      // changeRoute,
    }
  },
})
</script>
