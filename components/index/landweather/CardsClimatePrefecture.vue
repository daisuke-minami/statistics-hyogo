<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 快晴日数
const SunnyDays = () => {
  return import(
    '~/components/index/landweather/cards/climate/sunnyDaysPrefecture.vue'
  )
}

// 曇天日数
const CloudyDays = () => {
  return import(
    '~/components/index/landweather/cards/climate/cloudyDaysPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[SunnyDays, CloudyDays]])

    return {
      rows,
    }
  },
})
</script>
