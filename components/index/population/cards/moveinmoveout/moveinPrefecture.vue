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
      title: '転入者数（日本人）',
      titleId: 'movein',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A5101', 'A510101', 'A510102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A5101',
          name: '転入者数（日本人）',
        },
        {
          id: 'cat01',
          code: 'A510101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A510102',
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
