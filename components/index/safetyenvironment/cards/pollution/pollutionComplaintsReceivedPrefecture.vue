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
      title: '公害苦情受付件数',
      titleId: 'pollution-complaints-received',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K6101', 'K610101', 'K610102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K6101',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'K610101',
          name: '新規受付件数',
        },
        {
          id: 'cat01',
          code: 'K610102',
          name: '前年度繰越受付件数',
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
