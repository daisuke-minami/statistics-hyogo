<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 商業事業所数
const CommercialEstablishments = () => {
  return import(
    '~/components/index/commercial/cards/commercial/commercialEstablishmentsPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[CommercialEstablishments]])

    return {
      rows,
    }
  },
})
</script>
