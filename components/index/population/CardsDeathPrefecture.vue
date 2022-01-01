<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 出生数（男女別）
const DeathSex = () => {
  return import(
    '~/components/index/population/cards/death/deathSexPrefecture.vue'
  )
}

// 年齢調整死亡率
const AgeAdjustedMortality = () => {
  return import(
    '~/components/index/population/cards/death/ageAdjustedMortalityPrefecture.vue'
  )
}

// 標準化死亡率
const StandardizedMortality = () => {
  return import(
    '~/components/index/population/cards/death/standardizedMortalityPrefecture.vue'
  )
}

// 死産数
const StillBirth = () => {
  return import(
    '~/components/index/population/cards/death/stillbirthPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [DeathSex, AgeAdjustedMortality],
      [StandardizedMortality, StillBirth],
    ])

    return {
      rows,
    }
  },
})
</script>
