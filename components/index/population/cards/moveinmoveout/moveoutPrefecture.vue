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
      title: '転出者数（日本人）',
      titleId: 'moveout',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A5102', 'A510201', 'A510202'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A5102',
          name: '転出者数（日本人）',
        },
        {
          id: 'cat01',
          code: 'A510201',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A510202',
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
