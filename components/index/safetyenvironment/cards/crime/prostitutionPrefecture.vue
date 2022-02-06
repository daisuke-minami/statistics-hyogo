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
      title: '売春事犯',
      titleId: 'prostitution',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4305', 'K4306'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4305',
          name: '売春事犯の検挙件数',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K4306',
          name: '売春事犯の検挙人員',
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
