<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    const rows = ref<[]>()

    return {
      rows,
    }
  },
})
</script>
