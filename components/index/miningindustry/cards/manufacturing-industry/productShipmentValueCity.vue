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
      title: '製造品出荷額',
      titleId: 'product-shipment-value',
      params: {
        statsDataId: '0000020203',
        cdCat01: ['C3401'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3401',
          name: '製造品出荷額',
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
