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
  return import(
    '@/components/index/_shared/estat/EstatTimeChartColumnLineMulti.vue'
  )
}
// RankChart
const RankChart = () => {
  return import('@/components/index/_shared/estat/EstatPrefRankCard.vue')
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
        statsDataId: '0000010101',
        cdCat01: ['A4101', 'A410101', 'A410102', 'A4103'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A4101',
          name: '出生数総数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'A410101',
          name: '男性',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'A410102',
          name: '女性',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'A4103',
          name: '合計特殊出生率',
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
