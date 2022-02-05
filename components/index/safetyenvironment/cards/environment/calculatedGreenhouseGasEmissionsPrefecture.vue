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
      title: '温室効果ガス算定排出量',
      titleId: 'calculated-greenhouse-gas-emissions',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K6107', 'K6108'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K6107',
          name: '温室効果ガス算定排出量',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K6108',
          name: '温室効果ガス算定排出量（率）',
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
