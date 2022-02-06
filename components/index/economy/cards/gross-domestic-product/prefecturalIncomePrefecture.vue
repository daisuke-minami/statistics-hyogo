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
      title: '1人当たり県民所得（平成23年基準）',
      titleId: 'prefectural-income',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C121101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C121101',
          name: '1人当たり県民所得（平成23年基準）',
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
