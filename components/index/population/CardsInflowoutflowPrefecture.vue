<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 流出人口（県内）
const OutflowInside = () => {
  return import(
    '~/components/index/population/cards/inflowoutflow/outflowInsidePrefecture.vue'
  )
}

// 流出人口（県外）
const OutflowOutside = () => {
  return import(
    '~/components/index/population/cards/inflowoutflow/outflowOutsidePrefecture.vue'
  )
}

// 流入人口（県内）
const InflowInside = () => {
  return import(
    '~/components/index/population/cards/inflowoutflow/inflowInsidePrefecture.vue'
  )
}

// 流入人口（県外）
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
