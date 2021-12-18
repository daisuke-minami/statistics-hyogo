<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 実収入
const RealIncome = () => {
  return import(
    '~/components/index/economy/cards/household-budget/realIncomePrefecture.vue'
  )
}

// 消費支出
const ConsumptionExpenditureOne = () => {
  return import(
    '~/components/index/economy/cards/household-budget/consumptionExpenditureOnePrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[RealIncome, ConsumptionExpenditureOne]])

    return {
      rows,
    }
  },
})
</script>
