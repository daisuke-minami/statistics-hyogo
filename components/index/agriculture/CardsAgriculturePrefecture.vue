<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 農家数
const Farmers = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/farmersPrefecture.vue'
  )
}

// 農業就業人口（販売農家）
const AgriculturalWorking = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/agriculturalWorkingPrefecture.vue'
  )
}

// 耕地面積
const AgriculturalLand = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/agriculturalLandPrefecture.vue'
  )
}

// 耕地面積
const AgriculturalLandConversion = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/agriculturalLandConversionPrefecture.vue'
  )
}

// 農業産出額
const AgriculturalOutput = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/agriculturalOutputPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [Farmers, AgriculturalWorking],
      [AgriculturalLand, AgriculturalOutput],
      [AgriculturalLandConversion],
    ])

    return {
      rows,
    }
  },
})
</script>
