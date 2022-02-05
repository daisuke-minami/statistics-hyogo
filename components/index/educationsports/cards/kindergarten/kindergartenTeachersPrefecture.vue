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
      title: '幼稚園教員数',
      titleId: 'kindergarten-teachers',
      params: {
        statsDataId: '0000010105',
        cdCat01: ['E1301', 'E130101', 'E130102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'E1301',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'E130101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'E130102',
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
