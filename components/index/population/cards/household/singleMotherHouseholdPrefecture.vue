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
      title: '母子世帯数',
      titleId: 'single-mother-household',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010101',
      cdCat01: ['A8401', 'A840101', 'A840102', 'A840103'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'A8401',
        name: '総数',
      },
      {
        id: 'cat01',
        code: 'A840101',
        name: '子供が1人',
      },
      {
        id: 'cat01',
        code: 'A840102',
        name: '子供が2人',
      },
      {
        id: 'cat01',
        code: 'A840103',
        name: '子供が3人以上',
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
