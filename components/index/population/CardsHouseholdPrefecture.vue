<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 一般世帯数
const Household = () => {
  return import(
    '~/components/index/population/cards/household/householdPrefecture.vue'
  )
}

// 母子世帯数
const SingleMotherHousehold = () => {
  return import(
    '~/components/index/population/cards/household/singleMotherHouseholdPrefecture.vue'
  )
}

// // 離婚件数
// const Divorce = () => {
//   return import(
//     '~/components/index/population/cards/marriage/divorcePrefecture.vue'
//   )
// }

// // 平均初婚年齢
// const FirstMarriageAge = () => {
//   return import(
//     '~/components/index/population/cards/marriage/firstMarriageAgePrefecture.vue'
//   )
// }

// RankChart
// const PopulationPrefectureRank = () => {
//   return import(
//     '@/components/index/population/cards/populationPrefectureRank.vue'
//   )
// }

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[Household, SingleMotherHousehold]])

    return {
      rows,
    }
  },
})
</script>
