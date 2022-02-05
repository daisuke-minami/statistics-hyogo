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
      title: '覚せい剤取締',
      titleId: 'stimulant-drug',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4304', 'K4305'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4303',
          name: '覚せい剤取締検挙件数',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K4304',
          name: '覚せい剤取締検挙人員',
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
