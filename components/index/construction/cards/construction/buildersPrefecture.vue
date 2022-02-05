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
      title: '建設業者数',
      titleId: 'builders',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3306'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3306',
          name: '建設業者数',
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
