<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// ごみ総排出量
const GarbageDischarged = () => {
  return import(
    '~/components/index/energy/cards/garbage/garbageDischargedPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[GarbageDischarged]])

    return {
      rows,
    }
  },
})
</script>
