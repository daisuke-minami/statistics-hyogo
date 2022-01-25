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
        @change="(value) => changeRoute(value)"
      />
    </static-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCityList } from '~/composition/useCityList'
// import { City } from '~/types/resas'

export default defineComponent({
  setup() {
    const { cityList } = useCityList()
    // const test = ref<City>(useCityList().cityListBigCityJoin)
    // console.log(test)

    // const cityList = useCityList().getCityList.value
    const selectedCity = useCityList().selectedCity.value
    const changeRoute = useCityList().changeRouter.value

    return {
      cityList,
      selectedCity,
      changeRoute,
    }
  },
})
</script>
