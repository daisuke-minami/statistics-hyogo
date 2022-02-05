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
      title: '養殖収穫量',
      titleId: 'aquaculture-yield',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3122', 'C312201', 'C312202'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3122',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C312201',
          name: '海面養殖業収獲量',
        },
        {
          id: 'cat01',
          code: 'C312202',
          name: '内水面養殖業収獲量',
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
