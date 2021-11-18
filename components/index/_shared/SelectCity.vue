<template>
  <div>
    <v-tabs dark background-color="teal darken-3" show-arrows>
      <v-tabs-slider color="teal lighten-3" />
      <v-tab v-for="i in 30" :key="i" :href="'#tab-' + i"> Item {{ i }} </v-tab>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'
import { City } from '~/store/cityList'

type Computed = {
  cityList: () => City[]
  items: () => { label: string; link: string }
}

export default defineComponent({
  setup() {
    const store = useStore()
    const cityList = computed(() => store.getters['cityList/getCityList'])

    const items = computed(() =>
      cityList.value.map((d: City) => {
        return {
          label: d.cityName,
          link: `/${d.cityCode}`,
        }
      })
    )
    console.log(items)
  },
})
</script>
