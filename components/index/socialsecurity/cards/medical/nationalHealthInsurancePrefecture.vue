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
      title: '国民健康保険被保険者数',
      titleId: 'national-health-insurance',
      params: {
        statsDataId: '0000010110',
        cdCat01: ['J4101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'J4101',
          name: '国民健康保険被保険者数',
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
