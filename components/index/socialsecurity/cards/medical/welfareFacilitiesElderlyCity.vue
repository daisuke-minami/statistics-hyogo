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
      title: '老人福祉施設数',
      titleId: 'welfare-facilities-elderly',
      params: {
        statsDataId: '0000020210',
        cdCat01: ['J2301'],
      },
      series: [
        {
          id: 'cat01',
          code: 'J2301',
          name: '老人福祉施設数',
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
