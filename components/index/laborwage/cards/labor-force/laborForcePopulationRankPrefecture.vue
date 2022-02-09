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
      title: '労働力人口ランキング',
      titleId: 'labor-force-population-rank',
      params: {
        statsDataId: '0000010106',
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
      annotation: [
        '労働力人口:15歳以上の人口のうち，「就業者」と「完全失業者」を合わせたもの',
      ],
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
