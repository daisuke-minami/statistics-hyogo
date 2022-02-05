<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-line-card'

    // State
    const estatState: EstatState = {
      title: '出入国管理及び難民認定法の送致件数',
      titleId: 'immigration-control',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4801', 'K4802'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4801',
          name: '送致件数',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K4802',
          name: '送致人員',
          type: 'line',
          yAxis: 0,
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
