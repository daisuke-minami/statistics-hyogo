<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 一般行政部門職員数
const AdministrativeStaff = () => {
  return import(
    '~/components/index/administrativefinancial/cards/staff/administrativeStaffCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[AdministrativeStaff]])

    return {
      rows,
    }
  },
})
</script>
