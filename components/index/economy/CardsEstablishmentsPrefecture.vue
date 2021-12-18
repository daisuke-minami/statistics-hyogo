<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 事業所数
const Establishments = () => {
  return import(
    '~/components/index/economy/cards/establishments/establishmentsPrefecture.vue'
  )
}

// 従業者数
const Employees = () => {
  return import(
    '~/components/index/economy/cards/establishments/employeesPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[Establishments, Employees]])

    return {
      rows,
    }
  },
})
</script>
