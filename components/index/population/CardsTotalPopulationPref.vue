<template>
  <cards-lazy-row v-bind="props" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'

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
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // データ定義
    const data = reactive({
      rows: [[TimeChart, RankChart]],
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
    })

    const annotation = computed(() => {
      return props.contents.annotation
    })

    return {
      // data,
      props: {
        rows: data.rows,
        annotation: annotation.value,
        series: data.series,
        estatParams: data.estatParams,
        latestYearInt: data.latestYearInt,
      },
    }
  },
})
</script>
