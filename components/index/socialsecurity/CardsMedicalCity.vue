<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 老人福祉施設数
const WelfareFacilitiesElderly = () => {
  return import(
    '~/components/index/socialsecurity/cards/medical/welfareFacilitiesElderlyCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[WelfareFacilitiesElderly]])

    return {
      rows,
    }
  },
})
</script>
