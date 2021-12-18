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
      title: '消費支出（二人以上の世帯のうち勤労者世帯）',
      titleId: 'consumption-expenditure-two',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010112',
      cdCat01: [
        'L3211',
        'L321101',
        'L321102',
        'L321103',
        'L321104',
        'L321105',
        'L321106',
        'L321107',
        'L321108',
        'L321109',
        'L321110',
      ],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'L3211',
        name: '総数',
      },
      {
        id: 'cat01',
        code: 'L321101',
        name: '食糧費',
      },
      {
        id: 'cat01',
        code: 'L321102',
        name: '住居費',
      },
      {
        id: 'cat01',
        code: 'L321103',
        name: '光熱・水道費',
      },
      {
        id: 'cat01',
        code: 'L321104',
        name: '家具・家事用品費',
      },
      {
        id: 'cat01',
        code: 'L321105',
        name: '被服及び履物費',
      },
      {
        id: 'cat01',
        code: 'L321106',
        name: '保険医療費',
      },
      {
        id: 'cat01',
        code: 'L321107',
        name: '交通・通信費',
      },
      {
        id: 'cat01',
        code: 'L321108',
        name: '教育費',
      },
      {
        id: 'cat01',
        code: 'L321109',
        name: '教養娯楽費',
      },
      {
        id: 'cat01',
        code: 'L321110',
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
