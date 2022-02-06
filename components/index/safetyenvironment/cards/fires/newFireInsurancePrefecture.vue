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
      title: '火災保険新契約件数',
      titleId: 'new-fire-insurance',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K2209', 'K2211'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K2211',
          name: '火災保険新契約金額',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K2209',
          name: '火災保険新契約件数',
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
