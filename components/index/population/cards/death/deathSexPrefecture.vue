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
      title: '死亡数',
      titleId: 'death-sex',
      params: {
        statsDataId: '0000010101',
        cdCat01: ['A4200', 'A420001', 'A420002'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A4200',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'A420001',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A420002',
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
