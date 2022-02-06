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
      title: '完全失業者数',
      titleId: 'unemployed',
      params: {
        statsDataId: '0000020206',
        cdCat01: ['F1107', 'F110701', 'F110702'],
      },
      series: [
        {
          id: 'cat01',
          code: 'F1107',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'F110701',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'F110702',
          name: '女性',
        },
      ],
      annotation: [
        '非労働力人口:15歳以上の人口のうち，「就業者」と「完全失業者」以外の者',
      ],
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
