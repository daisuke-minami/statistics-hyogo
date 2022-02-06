<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card-all-break'

    // State
    const estatState: EstatState = {
      title: '幼稚園在園者数',
      titleId: 'kindergarten-children',
      params: {
        statsDataId: '0000010105',
        cdCat01: ['E1501', 'E150104', 'E150105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'E1501',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'E150104',
          name: '男児',
        },
        {
          id: 'cat01',
          code: 'E150105',
          name: '女児',
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
