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
      title: '電力需要量',
      titleId: 'power-demans',
      params: {
        statsDataId: '0000010108',
        cdCat01: ['H5105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'H5105',
          name: '電力需要量',
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
