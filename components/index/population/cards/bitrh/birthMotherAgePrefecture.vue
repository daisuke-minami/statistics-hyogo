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
    const chartComponent = ref<string>('estat-column-card-multi')

    // cardタイトル
    const cardTitle = reactive<CardTitle>({
      title: '出生数（母親の年齢別）',
      titleId: 'birth-mother-age',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010101',
      cdCat01: [
        'A410201',
        'A410202',
        'A410203',
        'A410204',
        'A410205',
        'A410206',
        'A410207',
        'A410208',
        'A410209',
      ],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'A410201',
        name: '母親の年齢15歳未満',
      },
      {
        id: 'cat01',
        code: 'A410202',
        name: '母親の年齢15〜19歳',
      },
      {
        id: 'cat01',
        code: 'A410203',
        name: '母親の年齢20〜24歳',
      },
      {
        id: 'cat01',
        code: 'A410204',
        name: '母親の年齢25〜29歳',
      },
      {
        id: 'cat01',
        code: 'A410205',
        name: '母親の年齢30〜34歳',
      },
      {
        id: 'cat01',
        code: 'A410206',
        name: '母親の年齢35〜39歳',
      },
      {
        id: 'cat01',
        code: 'A410207',
        name: '母親の年齢40〜44歳',
      },
      {
        id: 'cat01',
        code: 'A410208',
        name: '母親の年齢45〜49歳',
      },
      {
        id: 'cat01',
        code: 'A410209',
        name: '母親の年齢50歳以上',
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
