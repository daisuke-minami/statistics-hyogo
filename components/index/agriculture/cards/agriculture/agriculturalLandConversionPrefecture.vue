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
      title: '農地転用面積',
      titleId: 'agricultural-land-conversion',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3108'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3108',
          name: '農地転用面積',
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
