<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 総面積
const TotalArea = () => {
  return import(
    '~/components/index/landweather/cards/area/totalAreaPrefecture.vue'
  )
}

// 総面積ランキング
const TotalAreaRank = () => {
  return import(
    '~/components/index/landweather/cards/area/totalAreaRankPrefecture.vue'
  )
}

// 可住地面積
const HabitableArea = () => {
  return import(
    '~/components/index/landweather/cards/area/habitableAreaPrefecture.vue'
  )
}

// 可住地面積ランキング
const HabitableAreaRank = () => {
  return import(
    '~/components/index/landweather/cards/area/habitableAreaRankPrefecture.vue'
  )
}

// 評価総地積
const EvaluationTotalCadastral = () => {
  return import(
    '~/components/index/landweather/cards/area/evaluationTotalCadastralPrefecture.vue'
  )
}

// 評価総地積ランキング
const EvaluationTotalCadastralRank = () => {
  return import(
    '~/components/index/landweather/cards/area/evaluationTotalCadastralRankPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [TotalArea, TotalAreaRank],
      [HabitableArea, HabitableAreaRank],
      [EvaluationTotalCadastral, EvaluationTotalCadastralRank],
    ])

    return {
      rows,
    }
  },
})
</script>
