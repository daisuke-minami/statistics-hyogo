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
      title: '合計特殊出生率',
      titleId: 'total-fertility-rate',
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
