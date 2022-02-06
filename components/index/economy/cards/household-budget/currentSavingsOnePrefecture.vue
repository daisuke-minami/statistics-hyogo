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
      title: '貯蓄現在高（二人以上の世帯）',
      titleId: 'current-savings-one',
      params: {
        statsDataId: '0000010112',
        cdCat01: ['L430101', 'L430102', 'L430103', 'L430104'],
      },
      series: [
        {
          id: 'cat01',
          code: 'L430101',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'L430102',
          name: '預貯金',
        },
        {
          id: 'cat01',
          code: 'L430103',
          name: '生命保険など',
        },
        {
          id: 'cat01',
          code: 'L430104',
          name: '有価証券',
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
