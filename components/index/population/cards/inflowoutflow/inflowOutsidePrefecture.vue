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
      title: '流入人口（県外）',
      titleId: 'outflow-outside',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010101',
      cdCat01: ['A6106', 'A610601', 'A610602'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'A6106',
        name: '流入人口（県外）',
      },
      {
        id: 'cat01',
        code: 'A610601',
        name: '男性',
      },
      {
        id: 'cat01',
        code: 'A610602',
        name: '女性',
      },
    ])
    const estatLatestYear = reactive<EstatTimes>({
      yearInt: 2019,
      yearStr: '2019100000',
      yearName: '2019年',
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
