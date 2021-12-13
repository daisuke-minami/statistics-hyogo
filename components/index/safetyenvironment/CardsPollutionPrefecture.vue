<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 公害苦情件数（典型7公害）
const PollutionComplaints = () => {
  return import(
    '~/components/index/safetyenvironment/cards/pollution/pollutionComplaintsPrefecture.vue'
  )
}

// 公害苦情受付件数
const PollutionComplaintsReceivedPrefecture = () => {
  return import(
    '~/components/index/safetyenvironment/cards/pollution/pollutionComplaintsReceivedPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [PollutionComplaints, PollutionComplaintsReceivedPrefecture],
    ])

    return {
      rows,
    }
  },
})
</script>
