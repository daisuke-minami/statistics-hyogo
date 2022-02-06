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
      title: '漁業産出額',
      titleId: 'fishery-output',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3120', 'C312001', 'C312002'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3120',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C312001',
          name: '海面漁業産出額',
        },
        {
          id: 'cat01',
          code: 'C312002',
          name: '海面養殖業産出額',
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
