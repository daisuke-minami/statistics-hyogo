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
      title: '実質公債費比率',
      titleId: 'real-debt-service-ratio',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D2111'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2111',
          name: '実質公債費比率',
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
