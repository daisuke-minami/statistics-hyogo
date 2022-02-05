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
      title: '実収入（二人以上の世帯のうち勤労者世帯）',
      titleId: 'real-income',
      params: {
        statsDataId: '0000010112',
        cdCat01: ['L3110', 'L3111', 'L3112'],
      },
      series: [
        {
          id: 'cat01',
          code: 'L3110',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'L3111',
          name: '経常収入',
        },
        {
          id: 'cat01',
          code: 'L3112',
          name: '特別収入',
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
