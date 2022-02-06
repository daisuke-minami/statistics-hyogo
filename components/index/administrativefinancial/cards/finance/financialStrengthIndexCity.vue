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
      title: '財政力指数',
      titleId: 'financial-strength-index',
      params: {
        statsDataId: '0000020204',
        cdCat01: ['D2201'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2201',
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
