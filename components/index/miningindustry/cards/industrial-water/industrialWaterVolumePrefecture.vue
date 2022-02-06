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
      title: '工業用水量',
      titleId: 'industrial-water-volume',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3406', 'C340601', 'C340602'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3406',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C340601',
          name: '淡水',
        },
        {
          id: 'cat01',
          code: 'C340602',
          name: '海水',
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
