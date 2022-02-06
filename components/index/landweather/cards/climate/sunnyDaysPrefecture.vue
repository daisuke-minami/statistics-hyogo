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
      title: '快晴日数',
      titleId: 'sunny-days',
      params: {
        statsDataId: '0000010102',
        cdCat01: ['B4104'],
      },
      series: [
        {
          id: 'cat01',
          code: 'B4104',
          name: '快晴日数',
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
