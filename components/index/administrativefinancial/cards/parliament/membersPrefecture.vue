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
      title: '県議会議員数',
      titleId: 'members',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D1210'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D1210',
          name: '県議会議員数',
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
