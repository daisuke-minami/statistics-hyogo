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
      title: '納税義務者数',
      titleId: 'taxpayers',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C120120', 'C120130'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C120120',
          name: '納税義務者数（所得割）',
        },
        {
          id: 'cat01',
          code: 'C120130',
          name: '納税義務者数（均等割）',
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
