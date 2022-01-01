<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 発電電力量
const PowerGeneration = () => {
  return import(
    '~/components/index/energy/cards/energy/powerGenerationPrefecture.vue'
  )
}

// 電力需要量
const PowerDemand = () => {
  return import(
    '~/components/index/energy/cards/energy/powerDemandPrefecture.vue'
  )
}

// ガソリン販売量
const GasolineSalesVolume = () => {
  return import(
    '~/components/index/energy/cards/energy/gasolineSalesVolumePrefecture.vue'
  )
}

// 都市ガス販売量
const CityGasSalesVolume = () => {
  return import(
    '~/components/index/energy/cards/energy/cityGasSalesVolumePrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [PowerGeneration, PowerDemand],
      [GasolineSalesVolume, CityGasSalesVolume],
    ])

    return {
      rows,
    }
  },
})
</script>
