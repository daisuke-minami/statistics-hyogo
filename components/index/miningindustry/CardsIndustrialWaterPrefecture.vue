<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 工業用水量
const IndustrialWaterVolume = () => {
  return import(
    '~/components/index/miningindustry/cards/industrial-water/industrialWaterVolumePrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[IndustrialWaterVolume]])

    return {
      rows,
    }
  },
})
</script>
