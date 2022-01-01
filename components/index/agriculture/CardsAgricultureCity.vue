<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 農業産出額
const AgriculturalOutput = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/agriculturalOutputCity.vue'
  )
}

// 耕作放棄地面積
const AbandonedCultivated = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/abandonedCultivatedCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[AgriculturalOutput, AbandonedCultivated]])

    return {
      rows,
    }
  },
})
</script>
