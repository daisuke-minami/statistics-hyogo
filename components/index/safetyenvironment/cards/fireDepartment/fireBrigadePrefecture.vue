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
    const chartComponent = ref<string>('estat-column-line-card-multi')

    // cardタイトル
    const cardTitle = reactive<CardTitle>({
      title: '消防団数',
      titleId: 'fire-brigade',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010111',
      cdCat01: ['K1104', 'K110401', 'K110402', 'K1105'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'K1104',
        name: '総数',
        type: 'column',
        yAxis: 0,
      },
      {
        id: 'cat01',
        code: 'K110401',
        name: '消防団数',
        type: 'column',
        yAxis: 0,
      },
      {
        id: 'cat01',
        code: 'K110402',
        name: '消防分団数',
        type: 'column',
        yAxis: 0,
      },
      {
        id: 'cat01',
        code: 'K1105',
        name: '消防団員数',
        type: 'line',
        yAxis: 1,
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
