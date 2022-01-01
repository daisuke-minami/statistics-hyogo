<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 総面積
const TotalArea = () => {
  return import(
    '~/components/index/landweather/cards/area/totalAreaPrefecture.vue'
  )
}

// 可住地面積
const HabitableArea = () => {
  return import(
    '~/components/index/landweather/cards/area/habitableAreaPrefecture.vue'
  )
}

// 評価総地積
const EvaluationTotalCadastral = () => {
  return import(
    '~/components/index/landweather/cards/area/evaluationTotalCadastralPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[TotalArea, HabitableArea], [EvaluationTotalCadastral]])

    return {
      rows,
    }
  },
})
</script>
