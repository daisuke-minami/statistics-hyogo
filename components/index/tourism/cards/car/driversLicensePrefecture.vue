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
      title: '運転免許保有者数',
      titleId: 'drivers-license',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010111',
      cdCat01: ['K3501', 'K3502', 'K3503'],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'K3501',
        name: '運転免許保有者数（大型）',
      },
      {
        id: 'cat01',
        code: 'K3502',
        name: '運転免許保有者数（中型）',
      },
      {
        id: 'cat01',
        code: 'K3503',
        name: '運転免許保有者数（普通）',
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
