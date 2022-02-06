<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card-all-break'

    // State
    const estatState: EstatState = {
      title: '死産数',
      titleId: 'stillbirth',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A4270', 'A427001'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A4270',
          name: '死産数',
        },
        {
          id: 'cat01',
          code: 'A427001',
          name: '自然死産数',
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
