<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 原動機付き自転車台数
const MotorizedBicycle = () => {
  return import(
    '~/components/index/tourism/cards/car/motorizedBicyclePrefecture.vue'
  )
}

// 運転免許保有者数
const DriversLicense = () => {
  return import(
    '~/components/index/tourism/cards/car/driversLicensePrefecture.vue'
  )
}

// 高齢者講習受講者数
const SeniorCitizens = () => {
  return import(
    '~/components/index/tourism/cards/car/seniorCitizensPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[MotorizedBicycle, DriversLicense], [SeniorCitizens]])

    return {
      rows,
    }
  },
})
</script>
