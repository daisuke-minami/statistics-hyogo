<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 流出人口（県内）（男女別）
const OutflowInside = () => {
  return import(
    '~/components/index/population/cards/inflowoutflow/outflowInsidePrefecture.vue'
  )
}

const OutflowOutside = () => {
  return import(
    '~/components/index/population/cards/inflowoutflow/outflowOutsidePrefecture.vue'
  )
}

const InflowInside = () => {
  return import(
    '~/components/index/population/cards/inflowoutflow/inflowInsidePrefecture.vue'
  )
}

const InflowOutside = () => {
  return import(
    '~/components/index/population/cards/inflowoutflow/inflowOutsidePrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [OutflowInside, OutflowOutside],
      [InflowInside, InflowOutside],
    ])

    return {
      rows,
    }
  },
})
</script>
