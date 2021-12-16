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
      title: '自然公園面積',
      titleId: 'nature-park-area',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010102',
      cdCat01: ['B2101', 'B2103', 'B2105', 'B2104'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'B2101',
        name: '自然公園面積',
      },
      {
        id: 'cat01',
        code: 'B2105',
        name: '国定公園面積',
      },
      {
        id: 'cat01',
        code: 'B2104',
        name: '国立公園面積',
      },
      {
        id: 'cat01',
        code: 'B2103',
        name: '都道府県立自然公園面積',
      },
    ])
    const estatLatestYear = reactive<EstatTimes>({
      yearInt: 2019,
      yearStr: '2019100000',
      yearName: '2019年',
    })
    const estatAnnotation = reactive<string[]>([
      '自然公園とは、優れた自然の風景地に区域を画して設けられる公園のことをいい、その風景地の内容や指定方法により「国立公園」、「国定公園」、「都道府県立自然公園」の3種類に区分される',
      '国立公園：日本の中で特に優れた自然の風景地であり、環境大臣が指定する',
      '国定公園：国立公園に準ずる優れた自然の風景地であり、都道府県の申し出を受けて環境大臣が指定する',
      '都道府県立自然公園：都道府県の風景を代表する傑出した自然の風景地であり、都道府県知事が指定する',
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
