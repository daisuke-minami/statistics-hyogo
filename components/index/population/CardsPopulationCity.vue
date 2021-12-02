<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 総人口（男女別）
const TotalPopulation = () => {
  return import(
    '~/components/index/population/cards/population/totalPopulationCity.vue'
  )
}
// RankChart
const PopulationCityRank = () => {
  return import('@/components/index/population/cards/populationCityRank.vue')
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[TotalPopulation, PopulationCityRank]])

    return {
      rows,
    }
  },
})
</script>
