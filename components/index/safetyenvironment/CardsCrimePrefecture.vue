<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 防犯ボランティア
const CrimePreventionVolunteer = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/crimePreventionVolunteerPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[CrimePreventionVolunteer]])

    return {
      rows,
    }
  },
})
</script>
