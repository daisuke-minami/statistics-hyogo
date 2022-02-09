<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 労働力人口
const LaborForcePopulation = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/laborForcePopulationCity.vue'
  )
}

// 労働力人口ランキング
const LaborForcePopulationRank = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/laborForcePopulationRankCity.vue'
  )
}

// 就業者数
const Employees = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/employeesCity.vue'
  )
}

// 非労働力人口
const NonLaborPopulation = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/nonLaborPopulationCity.vue'
  )
}

// 完全失業者数
const Unemployed = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/unemployedCity.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [LaborForcePopulation, LaborForcePopulationRank],
      [Employees, NonLaborPopulation],
      [Unemployed],
    ])

    return {
      rows,
    }
  },
})
</script>
