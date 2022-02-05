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
      title: '実質収支比率',
      titleId: 'real-balance-ratio',
      params: {
        statsDataId: '0000020204',
        cdCat01: ['D2202'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2202',
          name: '実質収支比率',
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
