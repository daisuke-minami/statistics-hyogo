<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-line-card'

    // State
    const estatState: EstatState = {
      title: '自然災害による罹災',
      titleId: 'natural-disasters',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K5115', 'K5116'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K5115',
          name: '自然災害による罹災世帯数',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K5116',
          name: '自然災害による罹災者数',
          type: 'line',
          yAxis: 0,
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
