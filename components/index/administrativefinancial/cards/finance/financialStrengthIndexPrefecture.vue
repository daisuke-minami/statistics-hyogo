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
      title: '財政力指数',
      titleId: 'financial-strength-index',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D2101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2101',
          name: '財政力指数',
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
