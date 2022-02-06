<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-line-card'

    // State
    const estatState: EstatState = {
      title: '原動機付き自転車台数',
      titleId: 'motorized-bicycle',
      params: {
        statsDataId: '0000020208',
        cdCat01: ['H7208'],
      },
      series: [
        {
          id: 'cat01',
          code: 'H7208',
          name: '原動機付き自転車台数',
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
