<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 県内総生産（産業区分別）
const IndustryClass = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/industryClassPrefecture.vue'
  )
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
    const rows = ref([[IndustryClass]])

    return {
      rows,
    }
  },
})
</script>
