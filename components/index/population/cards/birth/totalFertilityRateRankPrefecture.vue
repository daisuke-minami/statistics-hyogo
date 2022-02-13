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
      title: '合計特殊出生率ランキング',
      titleId: 'total-fertility-rate-rank',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A4103'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A4103',
          name: '合計特殊出生率',
        },
      ],
      annotation: [],
      latestYear: {
        yearInt: 2019,
        yearStr: '2019100000',
        yearName: '2019年',
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
