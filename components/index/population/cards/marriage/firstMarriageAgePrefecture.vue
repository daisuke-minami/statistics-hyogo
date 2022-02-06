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
      title: '平均初婚年齢',
      titleId: 'first-marriage-age',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A9111', 'A9112'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A9111',
          name: '平均初婚年齢（初婚の夫）',
        },
        {
          id: 'cat01',
          code: 'A9112',
          name: '平均初婚年齢（初婚の妻）',
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
