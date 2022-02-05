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
      title: '売上金額（民営）',
      titleId: 'sales-amount',
      params: {
        statsDataId: '0000010103',
        cdCat01: [
          'C6101',
          'C610101',
          'C610105',
          'C610106',
          'C610107',
          'C610108',
          'C610109',
          'C610110',
          'C610111',
          'C610114',
          'C610115',
          'C610116',
          'C610117',
          'C610118',
          'C610119',
          'C610120',
          'C610121',
          'C610122',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'C6101',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C610101',
          name: '農林漁業',
        },
        {
          id: 'cat01',
          code: 'C610105',
          name: '鉱業，採石業，砂利採取業',
        },
        {
          id: 'cat01',
          code: 'C610106',
          name: '建設業',
        },
        {
          id: 'cat01',
          code: 'C610107',
          name: '製造業',
        },
        {
          id: 'cat01',
          code: 'C610108',
          name: '電気・ガス・熱供給・水道業',
        },
        {
          id: 'cat01',
          code: 'C610109',
          name: '情報通信業',
        },
        {
          id: 'cat01',
          code: 'C610110',
          name: '運輸業，郵便業',
        },
        {
          id: 'cat01',
          code: 'C610111',
          name: '卸売業，小売業',
        },
        {
          id: 'cat01',
          code: 'C610114',
          name: '金融業，保険業',
        },
        {
          id: 'cat01',
          code: 'C610115',
          name: '不動産業，物品賃貸業',
        },
        {
          id: 'cat01',
          code: 'C610116',
          name: '学術研究，専門・技術サービス業',
        },
        {
          id: 'cat01',
          code: 'C610117',
          name: '宿泊業，飲食サービス業',
        },
        {
          id: 'cat01',
          code: 'C610118',
          name: '生活関連サービス業，娯楽業',
        },
        {
          id: 'cat01',
          code: 'C610119',
          name: '教育，学習支援業',
        },
        {
          id: 'cat01',
          code: 'C610120',
          name: '医療，福祉',
        },
        {
          id: 'cat01',
          code: 'C610121',
          name: '複合サービス事業',
        },
        {
          id: 'cat01',
          code: 'C610122',
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
