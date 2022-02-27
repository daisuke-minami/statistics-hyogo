<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-prefecture-rank-card'

    // State
    const estatState: EstatState = {
      title: '評価総地積',
      titleId: 'evaluation-total-cadastral-rank',
      params: {
        statsDataId: '0000010102',
        cdCat01: [
          'B1201',
          'B120101',
          'B120102',
          'B120103',
          'B120104',
          'B120105',
          'B120106',
          'B120107',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'B1201',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'B120101',
          name: '田',
        },
        {
          id: 'cat01',
          code: 'B120102',
          name: '畑',
        },
        {
          id: 'cat01',
          code: 'B120103',
          name: '宅地',
        },
        {
          id: 'cat01',
          code: 'B120104',
          name: '山林',
        },
        {
          id: 'cat01',
          code: 'B120105',
          name: '牧場',
        },
        {
          id: 'cat01',
          code: 'B120106',
          name: '原野',
        },
        {
          id: 'cat01',
          code: 'B120107',
          name: 'その他',
        },
      ],
      annotation: [
        '地方税法第342条に基づき，固定資産税の課税客体とされた土地の面積の合計として，都道府県知事から総務大臣に対し，固定資産（土地）の価格等の概要調書によって報告された数値',
      ],
      latestYear: {
        yearInt: 2018,
        yearStr: '2018100000',
        yearName: '2018年',
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
