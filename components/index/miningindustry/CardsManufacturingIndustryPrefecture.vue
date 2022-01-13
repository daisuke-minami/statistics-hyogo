<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 製造品出荷額等
const ProductShipmentValue = () => {
  return import(
    '~/components/index/miningindustry/cards/manufacturing-industry/productShipmentValuePrefecture.vue'
  )
}

// 製造業付加価値額
// const ValueAdded = () => {
//   return import(
//     '~/components/index/miningindustry/cards/manufacturing-industry/valueAddedPrefecture.vue'
//   )
// }

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[ProductShipmentValue]])

    return {
      rows,
    }
  },
})
</script>
