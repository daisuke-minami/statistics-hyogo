<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-line-card'

    // State
    const estatState: EstatState = {
      title: '年間収入平均（勤労者世帯）',
      titleId: 'average-annual-income-two',
      params: {
        statsDataId: '0000010112',
        cdCat01: ['L450201'],
      },
      series: [
        {
          id: 'cat01',
          code: 'L450201',
          name: '年間収入平均（勤労者世帯）',
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
