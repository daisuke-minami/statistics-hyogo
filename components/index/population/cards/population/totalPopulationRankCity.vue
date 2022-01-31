<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { EstatState } from '~/types/estat'

export default defineComponent({
  setup() {
    // Chartコンポーネントの設定
    const cardComponent = ref<string>('estat-city-rank-card')

    // State
    const estatState = reactive<EstatState>({
      title: '総人口ランキング',
      titleId: 'total-population-rank',
      params: {
        statsDataId: '0000020201',
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
        yearInt: 2015,
        yearStr: '2015100000',
        yearName: '2015年',
      },
    })

    return {
      cardComponent,
      props: {
        estatState,
      },
    }
  },
})
</script>
