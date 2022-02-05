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
      title: '火災出火件数',
      titleId: 'fires',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K2101', 'K2102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K2101',
          name: '火災出火件数',
        },
        {
          id: 'cat01',
          code: 'K2102',
          name: '建物火災出火件数',
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
