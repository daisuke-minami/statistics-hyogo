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
      title: '旅館営業施設数',
      titleId: 'ryokan',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3801', 'C3802'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3801',
          name: '施設数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'C3802',
          name: '客室数',
          type: 'line',
          yAxis: 1,
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
