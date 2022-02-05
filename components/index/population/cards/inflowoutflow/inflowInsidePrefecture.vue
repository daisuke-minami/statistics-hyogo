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
      title: '流入人口（県内）',
      titleId: 'inflow-inside',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A6105', 'A610501', 'A610502'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A6105',
          name: '流入人口（県内）',
        },
        {
          id: 'cat01',
          code: 'A610501',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A610502',
          name: '女性',
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
