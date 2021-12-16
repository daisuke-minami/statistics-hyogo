<template>
  <lazy-component :is="chartComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import {
  CardTitle,
  EstatParams,
  EstatSeries,
  EstatTimes,
} from '~/utils/formatEstat'

export default defineComponent({
  setup() {
    // Chartコンポーネントの設定
    const chartComponent = ref<string>('estat-column-card-all-break')

    // cardタイトル
    const cardTitle = reactive<CardTitle>({
      title: '評価総地積',
      titleId: 'evaluation-total-cadastral',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
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
    })
    const estatSeries = reactive<EstatSeries[]>([
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
    ])
    const estatLatestYear = reactive<EstatTimes>({
      yearInt: 2019,
      yearStr: '2019100000',
      yearName: '2019年',
    })
    const estatAnnotation = reactive<string[]>([
      '地方税法第342条に基づき，固定資産税の課税客体とされた土地の面積の合計として，都道府県知事から総務大臣に対し，固定資産（土地）の価格等の概要調書によって報告された数値',
    ])

    return {
      chartComponent,
      props: {
        cardTitle,
        estatParams,
        estatSeries,
        estatLatestYear,
        estatAnnotation,
      },
    }
  },
})
</script>
