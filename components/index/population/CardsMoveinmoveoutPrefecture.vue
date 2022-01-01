<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 転入者数
const MoveIn = () => {
  return import(
    '~/components/index/population/cards/moveinmoveout/moveinPrefecture.vue'
  )
}

// 転出者数
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
