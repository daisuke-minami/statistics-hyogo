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
      title: '可住地面積',
      titleId: 'habitable-area',
      params: {
        statsDataId: '0000010102',
        cdCat01: ['B1103'],
      },
      series: [
        {
          id: 'cat01',
          code: 'B1103',
          name: '可住地面積',
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
