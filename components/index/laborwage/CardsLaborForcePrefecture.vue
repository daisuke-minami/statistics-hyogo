<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 労働力人口
const LaborForcePopulation = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/laborForcePopulationPrefecture.vue'
  )
}

// 労働力人口
const LaborForcePopulationRank = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/laborForcePopulationRankPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[LaborForcePopulation, LaborForcePopulationRank]])

    return {
      rows,
    }
  },
})
</script>
