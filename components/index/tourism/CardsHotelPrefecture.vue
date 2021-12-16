<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 旅館営業施設数
const Ryokan = () => {
  return import('~/components/index/tourism/cards/hotel/ryokanPrefecture.vue')
}
// RankChart
// const PopulationPrefectureRank = () => {
//   return import(
//     '@/components/index/population/cards/populationPrefectureRank.vue'
//   )
// }

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[Ryokan]])

    return {
      rows,
    }
  },
})
</script>
