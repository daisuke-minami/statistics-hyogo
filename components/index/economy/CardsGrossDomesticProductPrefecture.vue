<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 県内総生産（産業区分別）
const IndustryClass = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/industryClassPrefecture.vue'
  )
}

// 1人当たり県民所得
const PrefecturalIncome = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/prefecturalIncomePrefecture.vue'
  )
}

// 民間最終消費支出
const PrivateFinalConsumptionExpenditure = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/privateFinalConsumptionExpenditurePrefecture.vue'
  )
}

// 政府最終消費支出
const GovernmentFinalConsumptionExpenditure = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/governmentFinalConsumptionExpenditurePrefecture.vue'
  )
}

// 県内総資本形成（実質）
const TotalCapitalFormationNominal = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/totalCapitalFormationNominalPrefecture.vue'
  )
}

// 課税対象所得
const TaxableIncome = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/taxableIncomePrefecture.vue'
  )
}

// 納税義務者数
const Taxpayers = () => {
  return import(
    '~/components/index/economy/cards/gross-domestic-product/taxpayersPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [IndustryClass, PrefecturalIncome],
      [
        PrivateFinalConsumptionExpenditure,
        GovernmentFinalConsumptionExpenditure,
      ],
      [TotalCapitalFormationNominal, TaxableIncome],
      [Taxpayers],
    ])

    return {
      rows,
    }
  },
})
</script>
