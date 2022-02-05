<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-line-card'

    // State
    const estatState: EstatState = {
      title: '政府最終消費支出',
      titleId: 'government-final-consumption-expenditure',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C1312', 'C1412'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C1312',
          name: '政府最終消費支出（名目）（平成23年基準）',
        },
        {
          id: 'cat01',
          code: 'C1412',
          name: '政府最終消費支出（実質）（平成23年基準）',
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
