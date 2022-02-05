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
      title: '流入人口（県外）',
      titleId: 'outflow-outside',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A6106', 'A610601', 'A610602'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A6106',
          name: '流入人口（県外）',
        },
        {
          id: 'cat01',
          code: 'A610601',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A610602',
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
