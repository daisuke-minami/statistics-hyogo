<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card-multi'

    // State
    const estatState: EstatState = {
      title: '浸水被害',
      titleId: 'flood-damage',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K5113', 'K5114'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K5113',
          name: '建物被害床上浸水',
        },
        {
          id: 'cat01',
          code: 'K5114',
          name: '建物被害床下浸水',
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
