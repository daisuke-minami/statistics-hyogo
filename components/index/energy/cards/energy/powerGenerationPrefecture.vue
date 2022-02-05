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
      title: '発電電力量',
      titleId: 'power-generation',
      params: {
        statsDataId: '0000010108',
        cdCat01: ['H5104'],
      },
      series: [
        {
          id: 'cat01',
          code: 'H5104',
          name: '発電電力量',
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
