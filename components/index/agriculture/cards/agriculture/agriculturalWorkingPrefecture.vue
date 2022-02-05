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
      title: '農業就業人口（販売農家）',
      titleId: 'agricultural-working',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C310410', 'C310411', 'C310412'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C310410',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C310411',
          name: ' 男性',
        },
        {
          id: 'cat01',
          code: 'C310412',
          name: '女性',
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
