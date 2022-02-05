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
      title: '負債現在高（二人以上の世帯のうち勤労者世帯）',
      titleId: 'current-debt-two',
      params: {
        statsDataId: '0000010112',
        cdCat01: ['L440201'],
      },
      series: [
        {
          id: 'cat01',
          code: 'L440201',
          name: '負債現在高（二人以上の世帯のうち勤労者世帯）',
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
