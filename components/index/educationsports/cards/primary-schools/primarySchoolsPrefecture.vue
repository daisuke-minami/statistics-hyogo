<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card'

    // State
    const estatState: EstatState = {
      title: '小学校数',
      titleId: 'primary-schools',
      params: {
        statsDataId: '0000010105',
        cdCat01: ['E2101'],
      },
      series: [
        {
          id: 'cat01',
          code: 'E2101',
          name: '小学校数',
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
