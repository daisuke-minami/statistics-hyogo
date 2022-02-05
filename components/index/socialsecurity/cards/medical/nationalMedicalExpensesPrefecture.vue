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
      title: '国民医療費（総額）',
      titleId: 'national-medical-expenses',
      params: {
        statsDataId: '0000010110',
        cdCat01: ['J4001'],
      },
      series: [
        {
          id: 'cat01',
          code: 'J4001',
          name: '国民医療費（総額）',
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
