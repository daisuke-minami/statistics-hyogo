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
      title: '労働力人口',
      titleId: 'labor-force-population',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010106',
      cdCat01: ['F1101', 'F110101', 'F110102'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'F1101',
        name: '総数',
      },
      {
        id: 'cat01',
        code: 'F110101',
        name: '男性',
      },
      {
        id: 'cat01',
        code: 'F110102',
        name: '女性',
      },
    ])
    const estatLatestYear = reactive<EstatTimes>({
      yearInt: 2019,
      yearStr: '2019100000',
      yearName: '2019年',
    })
    const estatAnnotation = reactive<string[]>([
      '労働力人口:15歳以上の人口のうち，「就業者」と「完全失業者」を合わせたもの',
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
