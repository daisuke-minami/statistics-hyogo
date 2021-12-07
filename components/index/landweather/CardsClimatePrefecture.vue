<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 快晴日数
const NaturePark = () => {
  return import(
    '~/components/index/landweather/cards/climate/sunnyDaysPrefecture.vue'
  )
}

// 自然環境保全地域面積
// const NaturalEnvironmentConservationArea = () => {
//   return import(
//     '~/components/index/landweather/cards/park/naturalEnvironmentConservationAreaPrefecture.vue'
//   )
// }

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[NaturePark]])

    return {
      rows,
    }
  },
})
</script>
