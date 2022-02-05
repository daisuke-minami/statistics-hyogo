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
      title: '将来負担比率',
      titleId: 'future-burden-ratio',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D2112'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D2112',
          name: '将来負担比率',
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
