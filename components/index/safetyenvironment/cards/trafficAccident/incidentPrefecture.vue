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
      title: '交通事故事件件数',
      titleId: 'incident',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4402', 'K4403', 'K4404'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4402',
          name: '交通事故事件件数',
        },
        {
          id: 'cat01',
          code: 'K4403',
          name: '交通事故事件少年件数',
        },
        {
          id: 'cat01',
          code: 'K4404',
          name: '交通事故事件人員',
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
