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
      title: '付加価値額（民営）',
      titleId: 'value-added-amount',
      params: {
        statsDataId: '0000010103',
        cdCat01: [
          'C6201',
          'C620101',
          'C620105',
          'C620106',
          'C620107',
          'C620108',
          'C620109',
          'C620110',
          'C620111',
          'C620114',
          'C620115',
          'C620116',
          'C620117',
          'C620118',
          'C620119',
          'C620120',
          'C620121',
          'C620122',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'C6201',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C620101',
          name: '農林漁業',
        },
        {
          id: 'cat01',
          code: 'C620105',
          name: '鉱業，採石業，砂利採取業',
        },
        {
          id: 'cat01',
          code: 'C620106',
          name: '建設業',
        },
        {
          id: 'cat01',
          code: 'C620107',
          name: '製造業',
        },
        {
          id: 'cat01',
          code: 'C620108',
          name: '電気・ガス・熱供給・水道業',
        },
        {
          id: 'cat01',
          code: 'C620109',
          name: '情報通信業',
        },
        {
          id: 'cat01',
          code: 'C620110',
          name: '運輸業，郵便業',
        },
        {
          id: 'cat01',
          code: 'C620111',
          name: '卸売業，小売業',
        },
        {
          id: 'cat01',
          code: 'C620114',
          name: '金融業，保険業',
        },
        {
          id: 'cat01',
          code: 'C620115',
          name: '不動産業，物品賃貸業',
        },
        {
          id: 'cat01',
          code: 'C620116',
          name: '学術研究，専門・技術サービス業',
        },
        {
          id: 'cat01',
          code: 'C620117',
          name: '宿泊業，飲食サービス業',
        },
        {
          id: 'cat01',
          code: 'C620118',
          name: '生活関連サービス業，娯楽業',
        },
        {
          id: 'cat01',
          code: 'C620119',
          name: '教育，学習支援業',
        },
        {
          id: 'cat01',
          code: 'C620120',
          name: '医療，福祉',
        },
        {
          id: 'cat01',
          code: 'C620121',
          name: '複合サービス事業',
        },
        {
          id: 'cat01',
          code: 'C620122',
          name: 'サービス業（他に分類されないもの）',
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
