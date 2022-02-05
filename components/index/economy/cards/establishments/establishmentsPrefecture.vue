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
      title: '事業所数',
      titleId: 'establishments',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C2101', 'C2106', 'C2104', 'C2105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C2101',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C2106',
          name: '第１次産業',
        },
        {
          id: 'cat01',
          code: 'C2104',
          name: '第２次産業',
        },
        {
          id: 'cat01',
          code: 'C2105',
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
