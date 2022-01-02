<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 県議会議員数
const Members = () => {
  return import(
    '~/components/index/administrativefinancial/cards/parliament/membersPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[Members]])

    return {
      rows,
    }
  },
})
</script>
