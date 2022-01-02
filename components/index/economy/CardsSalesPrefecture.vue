<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 売上金額
// const SalesAmount = () => {
//   return import(
//     '~/components/index/economy/cards/sales/salesAmountPrefecture.vue'
//   )
// }

// 付加価値額
const ValueAddedAmount = () => {
  return import(
    '~/components/index/economy/cards/sales/valueAddedAmountPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[ValueAddedAmount]])

    return {
      rows,
    }
  },
})
</script>
