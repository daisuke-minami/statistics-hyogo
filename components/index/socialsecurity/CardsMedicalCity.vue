<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 老人福祉施設数
const WelfareFacilitiesElderly = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/welfareFacilitiesElderlyCity.vue'
  )
}

// 国民健康保険被保険者数
const NationalHealthInsurance = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/nationalHealthInsuranceCity.vue'
  )
}

// 国民健康保険給付金額
const NationalHealthInsuranceBenefitAmount = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/nationalHealthInsuranceBenefitAmountCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [WelfareFacilitiesElderly, NationalHealthInsurance],
      [NationalHealthInsuranceBenefitAmount],
    ])

    return {
      rows,
    }
  },
})
</script>
