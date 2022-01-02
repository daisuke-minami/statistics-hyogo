<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 小学校数
const PrimarySchools = () => {
  return import(
    '~/components/index/educationsports/cards/primary-schools/primarySchoolsCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[PrimarySchools]])

    return {
      rows,
    }
  },
})
</script>
