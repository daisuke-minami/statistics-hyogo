<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-line-card'

    // State
    const estatState: EstatState = {
      title: '任意自動車保険普及率',
      titleId: 'voluntary-car-insurance-penetration-rate',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K330501', 'K330502', 'K330503', 'K330504'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K330501',
          name: '車両',
        },
        {
          id: 'cat01',
          code: 'K330502',
          name: '対人',
        },
        {
          id: 'cat01',
          code: 'K330503',
          name: '対物',
        },
        {
          id: 'cat01',
          code: 'K330504',
          name: '搭乗者傷害',
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
