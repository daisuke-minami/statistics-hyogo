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
      title: '火災損害額',
      titleId: 'fire-damage-amount',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K2105', 'K2106'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K2105',
          name: '火災損害額',
        },
        {
          id: 'cat01',
          code: 'K2106',
          name: '建物火災損害額',
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
