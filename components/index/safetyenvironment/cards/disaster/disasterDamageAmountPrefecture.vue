<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-line-card'

    // State
    const estatState: EstatState = {
      title: '災害被害額',
      titleId: 'disaster-damage-amount',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K5112'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K5112',
          name: '災害被害額',
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
