<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import {
  defineComponent,
  reactive,
  ref,
  provide,
  inject,
} from '@nuxtjs/composition-api'
import { useEstatState, EstatStateKey, StateType } from '@/composition/estat'

// TimeChart
const TimeChart = () => {
  return import('@/components/index/_shared/estat/EstatTimeChartColumnLine.vue')
}
// RankChart
const RankChart = () => {
  return import('@/components/index/_shared/estat/EstatCityRankCard.vue')
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([[TimeChart, RankChart]])

    // estat
    const data = reactive<StateType>({
      estatParams: {
        statsDataId: '0000020201',
        cdCat01: ['A6107', 'A6108'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A6107',
          name: '昼間人口',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'A6108',
          name: '昼夜間人口比率',
          type: 'line',
          yAxis: 1,
        },
      ],
      latestYear: {
        yearInt: 2015,
      },
      annotation: [],
    })

    // provide(estatState)
    provide(EstatStateKey, useEstatState())
    const estatState = inject(EstatStateKey)
    if (estatState) {
      estatState.setEstatState(data)
    }

    return {
      rows,
    }
  },
})
</script>
