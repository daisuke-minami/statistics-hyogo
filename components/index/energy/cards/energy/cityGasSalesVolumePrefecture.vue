<template>
  <lazy-component :is="chartComponent" v-bind="props" />
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
      title: '都市ガス販売量',
      titleId: 'city-gas-sales-volume',
      params: {
        statsDataId: '0000010108',
        cdCat01: ['H5206'],
      },
      series: [
        {
          id: 'cat01',
          code: 'H5206',
          name: '都市ガス販売量',
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
