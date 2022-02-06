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
      title: '県内総生産(平成23年基準)',
      titleId: 'industry-class',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C1111', 'C1115', 'C1116', 'C1117'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C1111',
          name: '県内装生産額',
        },
        {
          id: 'cat01',
          code: 'C1115',
          name: '第１次産業',
        },
        {
          id: 'cat01',
          code: 'C1116',
          name: '第２次産業',
        },
        {
          id: 'cat01',
          code: 'C1117',
          name: '第３次産業',
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
