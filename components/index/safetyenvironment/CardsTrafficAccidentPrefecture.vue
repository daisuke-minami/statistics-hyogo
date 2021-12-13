<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 交通事故
const TrafficAccident = () => {
  return import(
    '~/components/index/safetyenvironment/cards/trafficAccident/trafficAccidentPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[TrafficAccident]])

    return {
      rows,
    }
  },
})
</script>
