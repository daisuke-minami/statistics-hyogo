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
      title: '婚姻件数',
      titleId: 'marriage',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A9101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A9101',
          name: '婚姻件数',
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
