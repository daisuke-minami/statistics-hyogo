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

// 一般世帯数ランキング
const HouseholdRank = () => {
  return import(
    '~/components/index/population/cards/household/householdRankPrefecture.vue'
  )
}

// 母子世帯数
const SingleMotherHousehold = () => {
  return import(
    '~/components/index/population/cards/household/singleMotherHouseholdPrefecture.vue'
  )
}

// 母子世帯数ランキング
const SingleMotherHouseholdRank = () => {
  return import(
    '~/components/index/population/cards/household/singleMotherHouseholdRankPrefecture.vue'
  )
}

// 父子世帯数
// const SingleFatherHousehold = () => {
//   return import(
//     '~/components/index/population/cards/household/singleFatherHouseholdPrefecture.vue'
//   )
// }

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [Household, HouseholdRank],
      [SingleMotherHousehold, SingleMotherHouseholdRank],
    ])

    return {
      rows,
    }
  },
})
</script>
