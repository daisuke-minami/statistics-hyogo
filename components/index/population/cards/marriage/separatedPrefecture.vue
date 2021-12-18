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
    const chartComponent = ref<string>('estat-pyramid-card')

    // cardタイトル
    const cardTitle = reactive<CardTitle>({
      title: '離別人口',
      titleId: 'separated',
    })

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010101',
      cdCat01: [
        'A1604031',
        'A1604032',
        'A1604041',
        'A1604042',
        'A1604051',
        'A1604052',
        'A1604061',
        'A1604062',
        'A1604071',
        'A1604072',
        'A1604081',
        'A1604082',
        'A1604091',
        'A1604092',
        'A1604101',
        'A1604102',
        'A1604111',
        'A1604112',
        'A1604121',
        'A1604122',
        'A1604131',
        'A1604132',
        'A1604141',
        'A1604142',
        'A1604151',
        'A1604152',
      ],
    })
    const estatSeries = reactive<EstatSeries[]>([
      {
        name: '20～24歳',
        man: 'A1604021',
        woman: 'A1604022',
      },
      {
        name: '25～29歳',
        man: 'A1604031',
        woman: 'A1604032',
      },
      {
        name: '30～34歳',
        man: 'A1604041',
        woman: 'A1604042',
      },
      {
        name: '35～39歳',
        man: 'A1604051',
        woman: 'A1604052',
      },
      {
        name: '40～44歳',
        man: 'A1604061',
        woman: 'A1604062',
      },
      {
        name: '45～49歳',
        man: 'A1604071',
        woman: 'A1604072',
      },
      {
        name: '50～54歳',
        man: 'A1604081',
        woman: 'A1604082',
      },
      {
        name: '55～59歳',
        man: 'A1604091',
        woman: 'A1604092',
      },
      {
        name: '60～64歳',
        man: 'A1604101',
        woman: 'A1604102',
      },
      {
        name: '65～69歳',
        man: 'A1604111',
        woman: 'A1604112',
      },
      {
        name: '70～74歳',
        man: 'A1604121',
        woman: 'A1604122',
      },
      {
        name: '75～79歳',
        man: 'A1604131',
        woman: 'A1604132',
      },
      {
        name: '80～84歳',
        man: 'A1604141',
        woman: 'A1604142',
      },
      {
        name: '85歳以上',
        man: 'A1604151',
        woman: 'A1604152',
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
