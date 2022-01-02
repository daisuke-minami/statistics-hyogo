<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 自然公園面積
const NaturePark = () => {
  return import(
    '~/components/index/landweather/cards/park/natureParkPrefecture.vue'
  )
}

// 自然環境保全地域面積
const NaturalEnvironmentConservationArea = () => {
  return import(
    '~/components/index/landweather/cards/park/naturalEnvironmentConservationAreaPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[NaturePark, NaturalEnvironmentConservationArea]])

    return {
      rows,
    }
  },
})
</script>
