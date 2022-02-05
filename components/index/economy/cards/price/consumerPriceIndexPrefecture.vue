<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-line-card'

    // State
    const estatState: EstatState = {
      title: '消費者物価地域差指数',
      titleId: 'consumer-price-index',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C5701'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C5701',
          name: '消費者物価地域差指数',
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
