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
      title: '小学校児童数',
      titleId: 'primary-school-students',
      params: {
        statsDataId: '0000010105',
        cdCat01: ['E2501', 'E250104', 'E250105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'E2501',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'E250104',
          name: '男児',
        },
        {
          id: 'cat01',
          code: 'E250105',
          name: '女児',
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
