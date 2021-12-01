<template>
  <lazy-component :is="chartComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import {
  EstatParams,
  CardTitle,
  EstatSeries,
  EstatTimes,
} from '~/utils/formatEstat'

export default defineComponent({
  setup() {
    // Chartコンポーネントの設定
    const chartComponent = ref<string>('estat-city-rank-card')

    // cardタイトル
    const cardTitle = reactive<CardTitle>({
      title: '総人口',
      titleId: 'total-population',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000020201',
      cdCat01: ['A1101', 'A110101', 'A110102'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'A1101',
        name: '総人口',
      },
      {
        id: 'cat01',
        code: 'A110101',
        name: '男性',
      },
      {
        id: 'cat01',
        code: 'A110102',
        name: '女性',
      },
    ])
    const estatLatestYear = reactive<EstatTimes>({
      yearInt: 2015,
      yearStr: '2015100000',
      yearName: '2015年',
    })
    const estatAnnotation = reactive<string[]>([])

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
