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
      title: '自然環境保全地域面積ランキング',
      titleId: 'natural-environment-conservation-area',
      params: {
        statsDataId: '0000010102',
        cdCat01: ['B1108', 'B2105', 'B2104', 'B2103'],
      },
      series: [
        {
          id: 'cat01',
          code: 'B1108',
          name: '自然環境保全地域面積',
        },
        {
          id: 'cat01',
          code: 'B2105',
          name: '国定公園面積',
        },
        {
          id: 'cat01',
          code: 'B2104',
          name: '国立公園面積',
        },
        {
          id: 'cat01',
          code: 'B2103',
          name: '都道府県立自然公園面積',
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
