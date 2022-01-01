<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 旅館営業施設数
const Ryokan = () => {
  return import('~/components/index/tourism/cards/hotel/ryokanPrefecture.vue')
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[Ryokan]])

    return {
      rows,
    }
  },
})
</script>
