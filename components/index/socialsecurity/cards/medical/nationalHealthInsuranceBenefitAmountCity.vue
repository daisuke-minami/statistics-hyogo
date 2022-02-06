<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card'

    // State
    const estatState: EstatState = {
      title: '国民健康保険給付金額',
      titleId: 'national-health-insurance-benefit-amount',
      params: {
        statsDataId: '0000020210',
        cdCat01: ['J4108'],
      },
      series: [
        {
          id: 'cat01',
          code: 'J4108',
          name: '国民健康保険給付金額',
        },
      ],
      annotation: [],
    }

    return {
      cardComponent,
      props: {
        estatState,
      },
    }
  },
})
</script>
