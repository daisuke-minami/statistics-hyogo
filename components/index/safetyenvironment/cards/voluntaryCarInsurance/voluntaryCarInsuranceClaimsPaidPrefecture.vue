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
      title: '任意自動車保険保険金支払件数',
      titleId: 'voluntary-car-insurance-claims-paid',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K3303', 'K3304'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K3303',
          name: '任意自動車保険保険金支払件数',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K3304',
          name: '任意自動車保険保険金支払金額',
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
