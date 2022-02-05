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
      title: '年齢調整死亡率',
      titleId: 'age-adjusted-mortality',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A424001', 'A424002'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A424001',
          name: '年齢調整死亡率（男性）',
        },
        {
          id: 'cat01',
          code: 'A424002',
          name: '年齢調整死亡率（女性）',
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
