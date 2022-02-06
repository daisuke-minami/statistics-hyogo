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
      title: '経常収支比率',
      titleId: 'current-account-ratio',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D2103'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2103',
          name: '経常収支比率',
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
