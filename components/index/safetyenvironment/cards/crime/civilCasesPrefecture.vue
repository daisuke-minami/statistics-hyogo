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
      title: '民事事件件数',
      titleId: 'civil-cases',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4701'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4701',
          name: '民事事件件数',
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
