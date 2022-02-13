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
      title: '出生数（男女別）',
      titleId: 'birth-sex',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A4101', 'A410101', 'A410102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A4101',
          name: '出生数',
        },
        {
          id: 'cat01',
          code: 'A410101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A410102',
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
