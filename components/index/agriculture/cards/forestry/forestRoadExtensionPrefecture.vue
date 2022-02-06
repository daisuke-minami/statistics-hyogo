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
      title: '林道延長',
      titleId: 'forest-road-extension',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3114'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3114',
          name: '林道延長',
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
