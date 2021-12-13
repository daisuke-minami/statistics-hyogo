<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 温室効果ガス算定排出量
const CalculatedGreenhouseGasEmissions = () => {
  return import(
    '~/components/index/safetyenvironment/cards/environment/calculatedGreenhouseGasEmissionsPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[CalculatedGreenhouseGasEmissions]])

    return {
      rows,
    }
  },
})
</script>
