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
      title: '農林漁業雇用者',
      titleId: 'agriculture-forestry-and-fisheries-employers',
      params: {
        statsDataId: '0000010106',
        cdCat01: ['F1302', 'F130201', 'F130202'],
      },
      series: [
        {
          id: 'cat01',
          code: 'F1302',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'F130201',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'F130202',
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
