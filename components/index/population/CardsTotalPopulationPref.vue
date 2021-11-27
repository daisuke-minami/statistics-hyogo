<template>
  <cards-lazy-row v-bind="props" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import {
  computed,
  defineComponent,
  reactive,
  // ref,
  // useFetch,
  // useStore,
} from '@nuxtjs/composition-api'
// import { Contents } from '@/store/setting'
// import { Pref } from '~/types/resas'
// import { result } from 'lodash'

// type Props = {
//   contents: Contents
// }

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
    TimeChart,
    RankChart,
  },
  props: {
    contents: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // カードコンポーネントの設定
    const data = reactive({
      rows: [[TimeChart, RankChart]],
      // rows: [[TimeChart]],
      // rows: [[RankChart]],
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

    // propsの設定
    const title = computed((): string => {
      return props.contents.title
    })
    const titleId = computed((): string => {
      return props.contents.titleId
    })
    const govType = computed(() => {
      return props.contents.govType
    })
    const selectedPref = computed(() => {
      return props.contents.selectedPref
    })
    const selectedCity = computed(() => {
      return props.contents.selectedCity
    })
    const annotation = computed(() => {
      return props.contents.annotation
    })
    const routingPath = computed(() => {
      return props.contents.routingPath
    })

    return {
      // data,
      props: {
        rows: data.rows,
        title: title.value,
        titleId: titleId.value,
        govType: govType.value,
        annotation: annotation.value,
        routingPath: routingPath.value,
        selectedPref: selectedPref.value,
        selectedCity: selectedCity.value,
        series: data.series,
        estatParams: data.estatParams,
        latestYearInt: data.latestYearInt,
      },
    }
  },
})
</script>
