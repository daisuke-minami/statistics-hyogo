<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 林道延長
const ForestRoadExtension = () => {
  return import(
    '~/components/index/agriculture/cards/forestry/forestRoadExtensionPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[ForestRoadExtension]])

    return {
      rows,
    }
  },
})
</script>
