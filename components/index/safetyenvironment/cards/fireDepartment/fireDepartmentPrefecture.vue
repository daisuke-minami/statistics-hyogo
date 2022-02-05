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
      title: '消防本部・署数',
      titleId: 'fire-department',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K1101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K1101',
          name: '消防本部・署数',
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
