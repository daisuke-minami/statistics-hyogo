<template>
  <div>
    <static-card>
      <v-select
        v-model="selectedCity"
        :items="cityList"
        item-text="cityName"
        item-value="cityCode"
        return-object
        @change="(value) => changeRoute(value, items)"
      />
    </static-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCity } from '~/composition/useCity'

export default defineComponent({
  setup() {
    const cityList = useCity().getCityList.value
    const selectedCity = useCity().selectedCity.value
    const changeRoute = useCity().changeRouter.value

    return {
      cityList,
      selectedCity,
      changeRoute,
    }
  },
})
</script>
