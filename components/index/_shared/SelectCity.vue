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
        @change="(value) => changeRoute(value, items)"
      />
    </static-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCityList } from '~/composition/useCityList'

export default defineComponent({
  setup() {
    const cityList = useCityList().getCityList.value
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
