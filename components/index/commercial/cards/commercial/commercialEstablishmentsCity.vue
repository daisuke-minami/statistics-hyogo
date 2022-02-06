<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card-all-break'

    // State
    const estatState: EstatState = {
      title: '商業事業所数',
      titleId: 'commercial-establishments',
      params: {
        statsDataId: '0000020203',
        cdCat01: ['C3502', 'C350201', 'C350202'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3502',
          name: '商業事業所数',
        },
        {
          id: 'cat01',
          code: 'C350201',
          name: '卸売業',
        },
        {
          id: 'cat01',
          code: 'C350202',
          name: '小売業',
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
