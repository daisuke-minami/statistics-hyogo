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
      title: '公害苦情件数（典型7公害）',
      titleId: 'pollution-complaints',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010111',
      cdCat01: [
        'K6103',
        'K610301',
        'K610302',
        'K610303',
        'K610304',
        'K610305',
        'K610306',
        'K610307',
      ],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'K6103',
        name: '総数',
      },
      {
        id: 'cat01',
        code: 'K610301',
        name: '大気汚染',
      },
      {
        id: 'cat01',
        code: 'K610302',
        name: '水質汚濁',
      },
      {
        id: 'cat01',
        code: 'K610303',
        name: '土壌汚染',
      },
      {
        id: 'cat01',
        code: 'K610304',
        name: '騒音',
      },
      {
        id: 'cat01',
        code: 'K610305',
        name: '振動',
      },
      {
        id: 'cat01',
        code: 'K610306',
        name: '地盤沈下',
      },
      {
        id: 'cat01',
        code: 'K610307',
        name: '悪臭',
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
