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
      title: '交通事故発生件数',
      titleId: 'traffic-accident',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K3101', 'K3102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K3101',
          name: '交通事故発生件数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'K3102',
          name: '交通事故死傷者数',
          type: 'line',
          yAxis: 1,
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
