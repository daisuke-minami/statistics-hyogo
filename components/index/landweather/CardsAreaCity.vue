<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 総面積
const TotalAreaCity = () => {
  return import('~/components/index/landweather/cards/area/totalAreaCity.vue')
}

// 総面積ランキング
const TotalAreaRankCity = () => {
  return import(
    '~/components/index/landweather/cards/area/totalAreaRankCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[TotalAreaCity, TotalAreaRankCity]])

    return {
      rows,
    }
  },
})
</script>
