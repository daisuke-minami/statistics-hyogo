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
      title: '運転免許保有者数',
      titleId: 'drivers-license',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K3501', 'K3502', 'K3503'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K3501',
          name: '運転免許保有者数（大型）',
        },
        {
          id: 'cat01',
          code: 'K3502',
          name: '運転免許保有者数（中型）',
        },
        {
          id: 'cat01',
          code: 'K3503',
          name: '運転免許保有者数（普通）',
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
