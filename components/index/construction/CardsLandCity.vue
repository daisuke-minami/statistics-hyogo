<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 標準価格
const StandardPrice = () => {
  return import(
    '~/components/index/construction/cards/land/standardPriceCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[StandardPrice]])

    return {
      rows,
    }
  },
})
</script>
