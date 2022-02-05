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
      title: '標準化死亡率',
      titleId: 'standardized-mortality',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A4301'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A4301',
          name: '標準化死亡率',
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
