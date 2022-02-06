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
      title: '曇天日数',
      titleId: 'cloudy-days',
      params: {
        statsDataId: '0000010102',
        cdCat01: ['B4105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'B4105',
          name: '曇天日数',
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
