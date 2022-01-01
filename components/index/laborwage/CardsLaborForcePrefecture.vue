<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 労働力人口
const LaborForcePopulation = () => {
  return import(
    '~/components/index/laborwage/cards/labor-force/laborForcePopulationPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[LaborForcePopulation]])

    return {
      rows,
    }
  },
})
</script>
