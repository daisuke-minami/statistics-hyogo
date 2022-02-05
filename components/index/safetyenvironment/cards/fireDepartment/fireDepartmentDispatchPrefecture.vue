<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card'

    // State
    const estatState: EstatState = {
      title: '消防機関出動回数',
      titleId: 'fire-department-dispatch',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K1201'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K1201',
          name: '消防機関出動回数',
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
