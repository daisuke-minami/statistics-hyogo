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
      title: '貯蓄現在高（二人以上の世帯のうち勤労者世帯）',
      titleId: 'current-savings-two',
      params: {
        statsDataId: '0000010112',
        cdCat01: ['L430201', 'L430202', 'L430203', 'L430204'],
      },
      series: [
        {
          id: 'cat01',
          code: 'L430201',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'L430202',
          name: '預貯金',
        },
        {
          id: 'cat01',
          code: 'L430203',
          name: '生命保険など',
        },
        {
          id: 'cat01',
          code: 'L430204',
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
