<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 合計特殊出生率
const TotalFertilityRate = () => {
  return import(
    '~/components/index/population/cards/birth/totalFertilityRatePrefecture.vue'
  )
}

const TotalFertilityRateRank = () => {
  return import(
    '~/components/index/population/cards/birth/totalFertilityRateRankPrefecture.vue'
  )
}

// 出生数（男女別）
const BirthSex = () => {
  return import(
    '~/components/index/population/cards/birth/birthSexPrefecture.vue'
  )
}

// 出生数（母親の年齢別）
const BirthMotherAge = () => {
  return import(
    '~/components/index/population/cards/birth/birthMotherAgePrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [TotalFertilityRate, TotalFertilityRateRank],
      [BirthSex, BirthMotherAge],
    ])

    return {
      rows,
    }
  },
})
</script>
