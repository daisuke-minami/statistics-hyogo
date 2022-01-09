<template>
  <lazy-component :is="chartComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // cardタイトル
    const cardTitle = {
      title: '総面積',
      titleId: 'total-area',
    }

    // Chartコンポーネントの設定
    const chartComponent = 'estat-column-card'

    // const estatConfig = {
    //   params: {
    //     statsDataId: '0000010102',
    //     cdCat01: ['B1101'],
    //   },
    //   series: [
    //     {
    //       name: '総面積',
    //       id: 'cat01',
    //       code: 'B1101',
    //     },
    //   ],
    // }

    // estatParams cdAreaはestatコンポーネントで設定
    const estatParams = {
      statsDataId: '0000010102',
      cdCat01: ['B1101'],
    }
    const estatSeries = reactive<EstatSeries[]>([
      {
        id: 'cat01',
        code: 'B1101',
        name: '総面積',
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
