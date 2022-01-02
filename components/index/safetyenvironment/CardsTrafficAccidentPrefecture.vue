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

// 交通事故事件
const Incident = () => {
  return import(
    '~/components/index/safetyenvironment/cards/trafficAccident/incidentPrefecture.vue'
  )
}

// 道路交通法違反検挙総件数（告知・送致）
const RoadTrafficLaw = () => {
  return import(
    '~/components/index/safetyenvironment/cards/trafficAccident/roadTrafficLawPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[TrafficAccident, Incident], [RoadTrafficLaw]])

    return {
      rows,
    }
  },
})
</script>
