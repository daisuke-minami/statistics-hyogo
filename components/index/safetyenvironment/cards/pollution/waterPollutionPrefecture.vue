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
      title: '水質汚濁防止法上の特定事業所数',
      titleId: 'water-pollution',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K6106'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K6106',
          name: '水質汚濁防止法上の特定事業所数',
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
