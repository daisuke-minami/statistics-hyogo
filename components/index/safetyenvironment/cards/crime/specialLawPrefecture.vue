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
      title: '特別法犯',
      titleId: 'special-law',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4301', 'K4302'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4301',
          name: '特別法犯検挙件数',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K4302',
          name: '特別法犯検挙人員',
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
