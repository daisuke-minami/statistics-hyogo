<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 財政力指数
const FinancialStrengthIndex = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/financialStrengthIndexCity.vue'
  )
}

// 実質収支比率
const RealBalanceRatio = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/realBalanceRatioCity.vue'
  )
}

// 将来負担比率
const CurrentAccountRatio = () => {
  return import(
    '~/components/index/administrativefinancial/cards/finance/currentAccountRatioCity.vue'
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
      [CurrentAccountRatio],
    ])

    return {
      rows,
    }
  },
})
</script>
