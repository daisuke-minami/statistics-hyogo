<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 災害被害額
const DisasterDamageAmount = () => {
  return import(
    '~/components/index/safetyenvironment/cards/disaster/disasterDamageAmountPrefecture.vue'
  )
}

// 浸水被害
const FloodDamage = () => {
  return import(
    '~/components/index/safetyenvironment/cards/disaster/floodDamagePrefecture.vue'
  )
}

// 自然災害による罹災
const NaturalDisasters = () => {
  return import(
    '~/components/index/safetyenvironment/cards/disaster/naturalDisastersPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[DisasterDamageAmount, FloodDamage], [NaturalDisasters]])

    return {
      rows,
    }
  },
})
</script>
