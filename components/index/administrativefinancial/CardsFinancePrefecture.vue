<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 財政力指数
const FinancialStrengthIndex = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/financialStrengthIndexPrefecture.vue'
  )
}

// 実質収支比率
const RealBalanceRatio = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/realBalanceRatioPrefecture.vue'
  )
}

// 基準財政収入額
const StandardFinancialIncome = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/standardFinancialIncomePrefecture.vue'
  )
}

// 基準財政需要額
const StandardFinancialDemand = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/standardFinancialDemandPrefecture.vue'
  )
}

// 実質公債費比率
const RealDebtServiceRatio = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/realDebtServiceRatioPrefecture.vue'
  )
}

// 将来負担比率
const FutureBurdenRatio = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/futureBurdenRatioPrefecture.vue'
  )
}

// 経常収支比率
const CurrentAccountRatio = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/currentAccountRatioPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [FinancialStrengthIndex, RealBalanceRatio],
      [StandardFinancialIncome, StandardFinancialDemand],
      [RealDebtServiceRatio, FutureBurdenRatio],
      [CurrentAccountRatio],
    ])

    return {
      rows,
    }
  },
})
</script>
