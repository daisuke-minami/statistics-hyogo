<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 消費者物価地域差指数
const ConsumerPriceIndex = () => {
  return import(
    '~/components/index/economy/cards/price/consumerPriceIndexPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[ConsumerPriceIndex]])

    return {
      rows,
    }
  },
})
</script>
