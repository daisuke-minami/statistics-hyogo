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
      title: '高齢者講習受講者数',
      titleId: 'senior-citizens',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K3504', 'K3505'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K3504',
          name: '高齢者講習受講者数（70〜74歳）',
        },
        {
          id: 'cat01',
          code: 'K3505',
          name: '高齢者講習受講者数（75歳以上）',
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
