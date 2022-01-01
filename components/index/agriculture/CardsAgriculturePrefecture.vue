<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

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

// 農地転用面積
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

// 耕作放棄地面積
const AbandonedCultivated = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/abandonedCultivatedPrefecture.vue'
  )
}

// 農林漁業者
const AgricultureForestryFisher = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/agricultureForestryFisherPrefecture.vue'
  )
}

// 農林漁業雇用者
const AgricultureForestryFisherEmployers = () => {
  return import(
    '~/components/index/agriculture/cards/agriculture/agricultureForestryFisherEmployersPrefecture.vue'
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
      [AgriculturalLandConversion, AbandonedCultivated],
      [AgricultureForestryFisher, AgricultureForestryFisherEmployers],
    ])

    return {
      rows,
    }
  },
})
</script>
