<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-line-card'

    // State
    const estatState: EstatState = {
      title: '課税対象所得',
      titleId: 'taxable-income',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C120110'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C120110',
          name: '課税対象所得',
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
