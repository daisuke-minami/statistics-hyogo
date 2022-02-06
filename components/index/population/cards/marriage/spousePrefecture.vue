<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // Chartコンポーネントの設定
    const cardComponent = 'estat-pyramid-card'

    // State
    const estatState: EstatState = {
      title: '有配偶人口',
      titleId: 'spouse',
      params: {
        statsDataId: '0000010101',
        cdCat01: [
          'A1602021',
          'A1602022',
          'A1602031',
          'A1602032',
          'A1602041',
          'A1602042',
          'A1602051',
          'A1602052',
          'A1602061',
          'A1602062',
          'A1602071',
          'A1602072',
          'A1602081',
          'A1602082',
          'A1602091',
          'A1602092',
          'A1602101',
          'A1602102',
          'A1602111',
          'A1602112',
          'A1602121',
          'A1602122',
          'A1602131',
          'A1602132',
          'A1602141',
          'A1602142',
          'A1602151',
          'A1602152',
        ],
      },
      series: [
        {
          id: 'cat01',
          name: '20～24歳',
          man: 'A1602021',
          woman: 'A1602022',
        },
        {
          id: 'cat01',
          name: '25～29歳',
          man: 'A1602031',
          woman: 'A1602032',
        },
        {
          id: 'cat01',
          name: '30～34歳',
          man: 'A1602041',
          woman: 'A1602042',
        },
        {
          id: 'cat01',
          name: '35～39歳',
          man: 'A1602051',
          woman: 'A1602052',
        },
        {
          id: 'cat01',
          name: '40～44歳',
          man: 'A1602061',
          woman: 'A1602062',
        },
        {
          id: 'cat01',
          name: '45～49歳',
          man: 'A1602071',
          woman: 'A1602072',
        },
        {
          id: 'cat01',
          name: '50～54歳',
          man: 'A1602081',
          woman: 'A1602082',
        },
        {
          id: 'cat01',
          name: '55～59歳',
          man: 'A1602091',
          woman: 'A1602092',
        },
        {
          id: 'cat01',
          name: '60～64歳',
          man: 'A1602101',
          woman: 'A1602102',
        },
        {
          id: 'cat01',
          name: '65～69歳',
          man: 'A1602111',
          woman: 'A1602112',
        },
        {
          id: 'cat01',
          name: '70～74歳',
          man: 'A1602121',
          woman: 'A1602122',
        },
        {
          id: 'cat01',
          name: '75～79歳',
          man: 'A1602131',
          woman: 'A1602132',
        },
        {
          id: 'cat01',
          name: '80～84歳',
          man: 'A1602141',
          woman: 'A1602142',
        },
        {
          id: 'cat01',
          name: '85歳以上',
          man: 'A1602151',
          woman: 'A1602152',
        },
      ],
      annotation: [],
      latestYear: {
        yearInt: 2015,
        yearStr: '2015100000',
        yearName: '2015年',
      },
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
