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
      title: '農林漁業者',
      titleId: 'agriculture-forestry-fisher',
      params: {
        statsDataId: '0000010106',
        cdCat01: ['F1301'],
      },
      series: [
        {
          id: 'cat01',
          code: 'F1301',
          name: '農林漁業者',
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
