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
      title: '救急出動件数',
      titleId: 'emergency-dispatches',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K1210'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K1210',
          name: '救急出動件数',
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
