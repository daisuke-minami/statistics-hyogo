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
      title: '消防部門職員数',
      titleId: 'fire-department-staff',
      params: {
        statsDataId: '0000010104',
        cdCat01: ['D1203'],
      },
      series: [
        {
          id: 'cat01',
          code: 'D1203',
          name: '消防部門職員数',
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
