<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// ごみ総排出量
const GarbageDischarged = () => {
  return import(
    '~/components/index/energy/cards/garbage/garbageDischargedCity.vue'
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
