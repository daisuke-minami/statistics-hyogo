<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 漁業産出額
const FisheryOutput = () => {
  return import(
    '~/components/index/agriculture/cards/fishing/fisheryOutputPrefecture.vue'
  )
}

// 養殖収穫量
const AquacultureYield = () => {
  return import(
    '~/components/index/agriculture/cards/fishing/aquacultureYieldPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[FisheryOutput, AquacultureYield]])

    return {
      rows,
    }
  },
})
</script>
