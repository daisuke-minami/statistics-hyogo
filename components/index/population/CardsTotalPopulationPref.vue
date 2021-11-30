<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 総人口（男女別）
const TotalPopulation = () => {
  return import(
    '@/components/index/population/cards/totalPopulationCardPref.vue'
  )
}
// RankChart
// const RankChart = () => {
//   return import('@/components/index/_shared/estat/EstatPrefRankCard.vue')
// }

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[TotalPopulation]])

    return {
      rows,
    }
  },
})
</script>
