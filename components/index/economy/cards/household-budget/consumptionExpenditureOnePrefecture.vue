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
      title: '消費支出（二人以上の世帯）',
      titleId: 'consumption-expenditure-one',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010112',
      cdCat01: [
        'L3221',
        'L322101',
        'L322102',
        'L322103',
        'L322104',
        'L322105',
        'L322106',
        'L322107',
        'L322108',
        'L322109',
        'L322110',
      ],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'L3221',
        name: '総数',
      },
      {
        id: 'cat01',
        code: 'L322101',
        name: '食糧費',
      },
      {
        id: 'cat01',
        code: 'L322102',
        name: '住居費',
      },
      {
        id: 'cat01',
        code: 'L322103',
        name: '光熱・水道費',
      },
      {
        id: 'cat01',
        code: 'L322104',
        name: '家具・家事用品費',
      },
      {
        id: 'cat01',
        code: 'L322105',
        name: '被服及び履物費',
      },
      {
        id: 'cat01',
        code: 'L322106',
        name: '保険医療費',
      },
      {
        id: 'cat01',
        code: 'L322107',
        name: '交通・通信費',
      },
      {
        id: 'cat01',
        code: 'L322108',
        name: '教育費',
      },
      {
        id: 'cat01',
        code: 'L322109',
        name: '教養娯楽費',
      },
      {
        id: 'cat01',
        code: 'L322110',
        name: 'その他',
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
