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
      title: '農業産出額',
      titleId: 'agricultural-output',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3101',
          name: '農業産出額',
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
