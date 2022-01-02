<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 幼稚園数
const Kindergartens = () => {
  return import(
    '~/components/index/educationsports/cards/kindergarten/kindergartensCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[Kindergartens]])

    return {
      rows,
    }
  },
})
</script>
