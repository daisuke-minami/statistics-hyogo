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
      title: 'ごみ総排出量',
      titleId: 'garbage-discharged',
      params: {
        statsDataId: '0000020208',
        cdCat01: ['H5609'],
      },
      series: [
        {
          id: 'cat01',
          code: 'H5609',
          name: 'ごみ総排出量',
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
