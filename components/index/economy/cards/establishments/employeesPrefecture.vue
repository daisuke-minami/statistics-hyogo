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
      title: '従業者数',
      titleId: 'employees',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C2201', 'C2206', 'C2204', 'C2205'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C2201',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C2206',
          name: '第１次産業',
        },
        {
          id: 'cat01',
          code: 'C2204',
          name: '第２次産業',
        },
        {
          id: 'cat01',
          code: 'C2205',
          name: '第３次産業',
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
