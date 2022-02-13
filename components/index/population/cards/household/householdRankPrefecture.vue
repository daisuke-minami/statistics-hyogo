<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-prefecture-rank-card'

    // State
    const estatState: EstatState = {
      title: '一般世帯数ランキング',
      titleId: 'household',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A710101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A710101',
          name: '一般世帯数',
        },
      ],
      annotation: [],
      latestYear: {
        yearInt: 2015,
        yearStr: '2015100000',
        yearName: '2015年',
      },
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
