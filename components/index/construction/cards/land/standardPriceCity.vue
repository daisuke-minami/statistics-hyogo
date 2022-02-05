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
      title: '標準価格',
      titleId: 'standard-price',
      params: {
        statsDataId: '0000020203',
        cdCat01: ['C5401', 'C5403', 'C5405'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C5401',
          name: '住宅地',
        },
        {
          id: 'cat01',
          code: 'C5403',
          name: '商業地',
        },
        {
          id: 'cat01',
          code: 'C5405',
          name: '工業地',
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
