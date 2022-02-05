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
      title: '外国人被疑事件受理人員',
      titleId: 'accepting-alleged-foreigners',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K4803', 'K480301', 'K480302'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K4803',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'K480301',
          name: '既済人員',
        },
        {
          id: 'cat01',
          code: 'K480302',
          name: '未済人員',
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
