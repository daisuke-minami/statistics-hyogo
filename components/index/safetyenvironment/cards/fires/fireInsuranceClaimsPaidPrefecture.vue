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
      title: '火災保険保険金支払件数',
      titleId: 'fire-insurance-claims-paid',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K2213', 'K2215'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K2215',
          name: '火災保険保険金支払金額',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K2213',
          name: '火災保険保険金支払件数',
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
