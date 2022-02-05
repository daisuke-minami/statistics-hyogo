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
      title: '任意自動車保険契約台数',
      titleId: 'voluntary-car-insurance',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K3301', 'K3302'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K3301',
          name: '任意自動車保険契約台数',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K3302',
          name: '任意自動車保険契約保険料',
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
