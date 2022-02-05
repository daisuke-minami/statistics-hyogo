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
      title: '非労働力人口',
      titleId: 'non-labor-population',
      params: {
        statsDataId: '0000020206',
        cdCat01: ['F1108', 'F110801', 'F110802'],
      },
      series: [
        {
          id: 'cat01',
          code: 'F1108',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'F110801',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'F110802',
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
