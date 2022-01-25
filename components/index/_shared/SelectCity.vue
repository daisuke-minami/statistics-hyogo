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
// import { City } from '~/types/resas'

export default defineComponent({
  setup() {
    const { cityListBigCityJoin } = useCityList()

    const selectedCity = useCityList().selectedCity.value
    const changeRoute = useCityList().changeRouter.value

    return {
      cityList: cityListBigCityJoin,
      selectedCity,
      changeRoute,
    }
  },
})
</script>
