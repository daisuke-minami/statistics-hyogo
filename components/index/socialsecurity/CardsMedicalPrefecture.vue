<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 国民医療費
const NationalMedicalExpenses = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/nationalMedicalExpensesPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[NationalMedicalExpenses]])

    return {
      rows,
    }
  },
})
</script>
