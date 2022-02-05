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
      title: '基準財政需要額',
      titleId: 'standard-financial-demand',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D2106'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2106',
          name: '基準財政需要額',
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
