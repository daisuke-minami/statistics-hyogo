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
      title: '消費支出（二人以上の世帯のうち勤労者世帯）',
      titleId: 'consumption-expenditure-two',
      params: {
        statsDataId: '0000010112',
        cdCat01: [
          'L3211',
          'L321101',
          'L321102',
          'L321103',
          'L321104',
          'L321105',
          'L321106',
          'L321107',
          'L321108',
          'L321109',
          'L321110',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'L3211',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'L321101',
          name: '食糧費',
        },
        {
          id: 'cat01',
          code: 'L321102',
          name: '住居費',
        },
        {
          id: 'cat01',
          code: 'L321103',
          name: '光熱・水道費',
        },
        {
          id: 'cat01',
          code: 'L321104',
          name: '家具・家事用品費',
        },
        {
          id: 'cat01',
          code: 'L321105',
          name: '被服及び履物費',
        },
        {
          id: 'cat01',
          code: 'L321106',
          name: '保険医療費',
        },
        {
          id: 'cat01',
          code: 'L321107',
          name: '交通・通信費',
        },
        {
          id: 'cat01',
          code: 'L321108',
          name: '教育費',
        },
        {
          id: 'cat01',
          code: 'L321109',
          name: '教養娯楽費',
        },
        {
          id: 'cat01',
          code: 'L321110',
          name: 'その他',
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
