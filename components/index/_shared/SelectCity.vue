<template>
  <div>
    <v-tabs dark background-color="teal darken-3" show-arrows>
      <v-tabs-slider color="teal lighten-3" />
      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :to="{ path: item.path }"
        nuxt
        exact
        @click="change"
      >
        {{ item.label }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'
import { EventBus, TOGGLE_EVENT } from '@/utils/tab-event-bus'
import { City } from '~/store/cityList'

type Computed = {
  cityList: () => City[]
  items: () => { label: string; path: string }
}

export default defineComponent({
  setup() {
    const store = useStore()
    const cityList = computed(() => store.getters['cityList/getCityList'])

    const items = computed(() =>
      cityList.value.map((d: City) => {
        return {
          label: d.cityName,
          path: `/${d.cityCode}`,
        }
      })
    )

    const change = (): void => {
      EventBus.$emit(TOGGLE_EVENT)
    }

    return {
      items,
      change,
    }
  },
})
</script>
