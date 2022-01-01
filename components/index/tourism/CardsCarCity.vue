<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 原動機付き自転車台数
const MotorizedBicycle = () => {
  return import('~/components/index/tourism/cards/car/motorizedBicycleCity.vue')
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[MotorizedBicycle]])

    return {
      rows,
    }
  },
})
</script>
