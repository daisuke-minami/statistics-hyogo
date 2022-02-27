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
      title: '総面積ランキング',
      titleId: 'total-area-rank',
      params: {
        statsDataId: '0000020202',
        cdCat01: ['B1101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'B1101',
          name: '総面積',
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
