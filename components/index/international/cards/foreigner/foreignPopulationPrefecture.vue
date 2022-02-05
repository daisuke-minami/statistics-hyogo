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
      title: '外国人人口',
      titleId: 'foreign-population',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A1700', 'A170001', 'A170002'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A1700',
          name: '外国人人口',
        },
        {
          id: 'cat01',
          code: 'A170001',
          name: '外国人人口（男性）',
        },
        {
          id: 'cat01',
          code: 'A170002',
          name: '外国人人口（女性）',
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
