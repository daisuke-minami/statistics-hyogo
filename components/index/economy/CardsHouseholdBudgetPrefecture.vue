<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

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

// 消費支出
const ConsumptionExpenditureTwo = () => {
  return import(
    '~/components/index/economy/cards/household-budget/consumptionExpenditureTwoPrefecture.vue'
  )
}

// 貯蓄現在高
const CurrentSavingsOne = () => {
  return import(
    '~/components/index/economy/cards/household-budget/currentSavingsOnePrefecture.vue'
  )
}

// 貯蓄現在高
const CurrentSavingsTwo = () => {
  return import(
    '~/components/index/economy/cards/household-budget/currentSavingsTwoPrefecture.vue'
  )
}

// 負債現在高
const CurrentDebtOne = () => {
  return import(
    '~/components/index/economy/cards/household-budget/currentDebtOnePrefecture.vue'
  )
}

// 負債現在高
const CurrentDebtTwo = () => {
  return import(
    '~/components/index/economy/cards/household-budget/currentDebtTwoPrefecture.vue'
  )
}

// 年間収入平均
const AverageAnnualIncomeOne = () => {
  return import(
    '~/components/index/economy/cards/household-budget/averageAnnualIncomeOnePrefecture.vue'
  )
}

// 年間収入平均
const AverageAnnualIncomeTwo = () => {
  return import(
    '~/components/index/economy/cards/household-budget/averageAnnualIncomeTwoPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [RealIncome, ConsumptionExpenditureOne],
      [ConsumptionExpenditureTwo, CurrentSavingsOne],
      [CurrentSavingsTwo, CurrentDebtOne],
      [CurrentDebtTwo, AverageAnnualIncomeOne],
      [AverageAnnualIncomeTwo],
    ])

    return {
      rows,
    }
  },
})
</script>
