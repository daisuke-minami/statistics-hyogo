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

// 外国人被疑事件受理人員
const AcceptingAllegedForeigners = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/acceptingAllegedForeignersPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[CrimePreventionVolunteer, AcceptingAllegedForeigners]])

    return {
      rows,
    }
  },
})
</script>
