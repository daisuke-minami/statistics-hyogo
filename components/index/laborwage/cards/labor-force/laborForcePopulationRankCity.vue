<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-city-rank-card'

    // State
    const estatState: EstatState = {
      title: '労働力人口',
      titleId: 'labor-force-population',
      params: {
        statsDataId: '0000020206',
        cdCat01: ['F1101', 'F110101', 'F110102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'F1101',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'F110101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'F110102',
          name: '女性',
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
