<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

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
