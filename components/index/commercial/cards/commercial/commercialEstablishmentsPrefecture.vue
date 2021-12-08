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
      title: '商業事業所数',
      titleId: 'commercial-establishments',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010103',
      cdCat01: ['C3502', 'C350201', 'C350202'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'C3502',
        name: '商業事業所数',
      },
      {
        id: 'cat01',
        code: 'C350201',
        name: '卸売業',
      },
      {
        id: 'cat01',
        code: 'C350202',
        name: '小売業',
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
