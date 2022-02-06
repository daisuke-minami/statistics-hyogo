<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card'

    // State
    const estatState: EstatState = {
      title: '家事事件件数',
      titleId: 'domestic-affairs',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4703'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4703',
          name: '家事事件件数',
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
