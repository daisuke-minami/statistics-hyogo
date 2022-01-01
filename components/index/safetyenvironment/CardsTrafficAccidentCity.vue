<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 交通事故
const TrafficAccident = () => {
  return import(
    '~/components/index/safetyenvironment/cards/trafficAccident/trafficAccidentCity.vue'
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
