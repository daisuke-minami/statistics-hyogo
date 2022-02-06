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
      title: '製造業付加価値額',
      titleId: 'value-added',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3402'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3402',
          name: '製造業付加価値額',
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
