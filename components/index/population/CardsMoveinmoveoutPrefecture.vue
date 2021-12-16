<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 転出者数（日本人）
const MoveIn = () => {
  return import(
    '~/components/index/population/cards/moveinmoveout/moveinPrefecture.vue'
  )
}

// 転出者数（日本人）
const MoveOut = () => {
  return import(
    '~/components/index/population/cards/moveinmoveout/moveoutPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[MoveIn, MoveOut]])

    return {
      rows,
    }
  },
})
</script>
