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
      title: '母子世帯数',
      titleId: 'single-mother-household',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A8401', 'A840101', 'A840102', 'A840103'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A8401',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'A840101',
          name: '子供が1人',
        },
        {
          id: 'cat01',
          code: 'A840102',
          name: '子供が2人',
        },
        {
          id: 'cat01',
          code: 'A840103',
          name: '子供が3人以上',
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
