<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 外国人人口（男女別）
const ForeignPopulation = () => {
  return import(
    '~/components/index/international/cards/foreigner/foreignPopulationPrefecture.vue'
  )
}

const ImmigrationControl = () => {
  return import(
    '~/components/index/international/cards/foreigner/immigrationControlPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[ForeignPopulation, ImmigrationControl]])

    return {
      rows,
    }
  },
})
</script>
