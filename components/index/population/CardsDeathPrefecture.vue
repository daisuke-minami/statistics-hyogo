<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

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

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[DeathSex, AgeAdjustedMortality]])

    return {
      rows,
    }
  },
})
</script>
