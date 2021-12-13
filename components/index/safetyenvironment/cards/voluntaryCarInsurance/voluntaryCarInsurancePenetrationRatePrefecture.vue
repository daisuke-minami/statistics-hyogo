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
    const chartComponent = ref<string>('estat-line-card')

    // cardタイトル
    const cardTitle = reactive<CardTitle>({
      title: '任意自動車保険普及率',
      titleId: 'voluntary-car-insurance-penetration-rate',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010111',
      cdCat01: ['K330501', 'K330502', 'K330503', 'K330504'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'K330501',
        name: '車両',
      },
      {
        id: 'cat01',
        code: 'K330502',
        name: '対人',
      },
      {
        id: 'cat01',
        code: 'K330503',
        name: '対物',
      },
      {
        id: 'cat01',
        code: 'K330504',
        name: '搭乗者傷害',
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
