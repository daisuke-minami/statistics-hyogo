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
      title: 'ガソリン販売量',
      titleId: 'gasoline-sales-volume',
      params: {
        statsDataId: '0000010108',
        cdCat01: ['H5205'],
      },
      series: [
        {
          id: 'cat01',
          code: 'H5205',
          name: 'ガソリン販売量',
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
