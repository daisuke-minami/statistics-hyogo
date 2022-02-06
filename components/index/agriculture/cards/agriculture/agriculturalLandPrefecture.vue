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
      title: '耕地面積',
      titleId: 'agricultural-land',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3107', 'C310701', 'C310702'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3107',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C310701',
          name: '田',
        },
        {
          id: 'cat01',
          code: 'C310702',
          name: '畑',
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
