<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // Chartコンポーネントの設定
    const cardComponent = 'estat-column-line-card-multi'

    // State
    const estatState: EstatState = {
      title: '消防団数',
      titleId: 'fire-brigade',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K1104', 'K110401', 'K110402', 'K1105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K1104',
          name: '総数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'K110401',
          name: '消防団数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'K110402',
          name: '消防分団数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'K1105',
          name: '消防団員数',
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
