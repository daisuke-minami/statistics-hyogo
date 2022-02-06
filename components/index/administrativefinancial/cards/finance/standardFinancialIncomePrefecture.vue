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
      title: '基準財政収入額',
      titleId: 'standard-financial-income',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D2105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2105',
          name: '基準財政収入額',
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
