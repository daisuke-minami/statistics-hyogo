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
      title: '小学校教員数',
      titleId: 'primary-school-teachers',
      params: {
        statsDataId: '0000010105',
        cdCat01: ['E2401', 'E240101', 'E240102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'E2401',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'E240101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'E240102',
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
