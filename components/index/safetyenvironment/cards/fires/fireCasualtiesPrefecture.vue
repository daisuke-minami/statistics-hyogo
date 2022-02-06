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
      title: '火災死傷者数',
      titleId: 'fire-casualties',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K2109', 'K2110', 'K2111'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K2109',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'K2110',
          name: '死亡者数',
        },
        {
          id: 'cat01',
          code: 'K2111',
          name: '負傷者数',
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
