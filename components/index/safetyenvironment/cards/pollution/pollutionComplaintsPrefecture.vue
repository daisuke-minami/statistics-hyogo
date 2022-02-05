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
      title: '公害苦情件数（典型7公害）',
      titleId: 'pollution-complaints',
      params: {
        statsDataId: '0000010111',
        cdCat01: [
          'K6103',
          'K610301',
          'K610302',
          'K610303',
          'K610304',
          'K610305',
          'K610306',
          'K610307',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'K6103',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'K610301',
          name: '大気汚染',
        },
        {
          id: 'cat01',
          code: 'K610302',
          name: '水質汚濁',
        },
        {
          id: 'cat01',
          code: 'K610303',
          name: '土壌汚染',
        },
        {
          id: 'cat01',
          code: 'K610304',
          name: '騒音',
        },
        {
          id: 'cat01',
          code: 'K610305',
          name: '振動',
        },
        {
          id: 'cat01',
          code: 'K610306',
          name: '地盤沈下',
        },
        {
          id: 'cat01',
          code: 'K610307',
          name: '悪臭',
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
