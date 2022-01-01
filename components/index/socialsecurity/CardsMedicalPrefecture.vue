<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 国民医療費
const NationalMedicalExpenses = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/nationalMedicalExpensesPrefecture.vue'
  )
}

// 老人福祉施設数
const WelfareFacilitiesElderly = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/welfareFacilitiesElderlyPrefecture.vue'
  )
}

// 国民健康保険被保険者数
const NationalHealthInsurance = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/nationalHealthInsurancePrefecture.vue'
  )
}

// 国民健康保険給付金額
const NationalHealthInsuranceBenefitAmount = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/nationalHealthInsuranceBenefitAmountPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [NationalMedicalExpenses, WelfareFacilitiesElderly],
      [NationalHealthInsurance, NationalHealthInsuranceBenefitAmount],
    ])

    return {
      rows,
    }
  },
})
</script>
