<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 任意自動車保険契約台数
const VoluntaryCarInsurance = () => {
  return import(
    '~/components/index/safetyenvironment/cards/voluntaryCarInsurance/voluntaryCarInsurancePrefecture.vue'
  )
}

// 任意自動車保険契約台数
const VoluntaryCarInsuranceClaimsPaid = () => {
  return import(
    '~/components/index/safetyenvironment/cards/voluntaryCarInsurance/voluntaryCarInsuranceClaimsPaidPrefecture.vue'
  )
}

// 任意自動車保険普及率
const VoluntaryCarInsurancePenetrationRate = () => {
  return import(
    '~/components/index/safetyenvironment/cards/voluntaryCarInsurance/voluntaryCarInsurancePenetrationRatePrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [VoluntaryCarInsurance, VoluntaryCarInsuranceClaimsPaid],
      [VoluntaryCarInsurancePenetrationRate],
    ])

    return {
      rows,
    }
  },
})
</script>
