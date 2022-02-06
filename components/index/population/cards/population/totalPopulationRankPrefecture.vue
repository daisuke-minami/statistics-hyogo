<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '~/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-prefecture-rank-card'

    // State
    const estatState: EstatState = {
      title: '総人口ランキング',
      titleId: 'total-population-rank',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A1101', 'A110101', 'A110102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A1101',
          name: '総人口',
        },
        {
          id: 'cat01',
          code: 'A110101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A110102',
          name: '女性',
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
