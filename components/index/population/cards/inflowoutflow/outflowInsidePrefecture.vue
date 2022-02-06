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
      title: '流出人口（県内）',
      titleId: 'outflow-inside',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A6103', 'A610301', 'A610302'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A6103',
          name: '流出人口（県内）',
        },
        {
          id: 'cat01',
          code: 'A610301',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A610302',
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
