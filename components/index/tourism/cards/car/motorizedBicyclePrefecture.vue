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
    const chartComponent = ref<string>('estat-column-line-card')

    // cardタイトル
    const cardTitle = reactive<CardTitle>({
      title: '原動機付き自転車台数',
      titleId: 'motorized-bicycle',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010108',
      cdCat01: ['H7208'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'H7208',
        name: '原動機付き自転車台数',
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
