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
      title: '道路交通法違反検挙総件数（告知・送致）',
      titleId: 'road-traffic-law',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4401'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4401',
          name: '道路交通法違反検挙総件数（告知・送致）',
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
