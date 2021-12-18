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
      title: '非労働力人口',
      titleId: 'non-labor-population',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000020206',
      cdCat01: ['F1108', 'F110801', 'F110802'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'F1108',
        name: '総数',
      },
      {
        id: 'cat01',
        code: 'F110801',
        name: '男性',
      },
      {
        id: 'cat01',
        code: 'F110802',
        name: '女性',
      },
    ])
    const estatLatestYear = reactive<EstatTimes>({
      yearInt: 2019,
      yearStr: '2019100000',
      yearName: '2019年',
    })
    const estatAnnotation = reactive<string[]>([
      '非労働力人口:15歳以上の人口のうち，「就業者」と「完全失業者」以外の者',
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
