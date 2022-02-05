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
      title: '県内総資本形成（実質）（平成23年基準）',
      titleId: 'total-capital-formation-real',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C1413', 'C141301', 'C141302'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C1413',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C141301',
          name: '総固定資本形成',
        },
        {
          id: 'cat01',
          code: 'C141302',
          name: '在庫変動',
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
