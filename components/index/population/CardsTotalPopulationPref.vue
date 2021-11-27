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
    '@/components/index/_shared/estat/EstatTimeChartSingleMulti.vue'
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
        cdCat01: ['A1101', 'A110101', 'A110102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A1101',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'A110101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A110102',
          name: '女性',
        },
      ],
      latestYearInt: 2019,
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
