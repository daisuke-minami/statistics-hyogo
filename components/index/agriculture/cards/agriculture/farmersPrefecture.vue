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
      title: '農家数',
      titleId: 'farmers',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3102', 'C310202', 'C310211', 'C310212'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3102',
          name: '農家数',
        },
        {
          id: 'cat01',
          code: 'C310202',
          name: '自給的農家',
        },
        {
          id: 'cat01',
          code: 'C310211',
          name: '販売農家（専業農家）',
        },
        {
          id: 'cat01',
          code: 'C310212',
          name: '販売農家（兼業農家）',
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
