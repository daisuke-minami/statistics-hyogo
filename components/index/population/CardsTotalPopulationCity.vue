<template>
  <cards-lazy-row v-bind="props" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import {
  defineComponent,
  reactive,
  provide,
  inject,
} from '@nuxtjs/composition-api'
import {
  useEstatState,
  EstatStateKey,
  EstatStateType,
} from '@/composition/estat'

// TimeChart
const TimeChart = () => {
  return import(
    '@/components/index/_shared/estat/EstatTimeChartSingleMulti.vue'
  )
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
    // データ定義
    const data = reactive({
      rows: [[TimeChart, RankChart]],
      estatParams: {
        statsDataId: '0000020201',
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
      latestYearInt: 2015,
      annotation: [],
    })

    // provide(estatState)
    provide(EstatStateKey, useEstatState())
    const estatState: EstatStateType = inject(EstatStateKey)
    estatState.setEstatState(data)

    return {
      props: {
        rows: data.rows,
      },
    }
  },
})
</script>
