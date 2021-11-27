<template>
  <cards-lazy-row :rows="data.rows" :contents="contents" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, reactive } from '@nuxtjs/composition-api'
// import { Contents, GovType } from '@/store/setting'

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
  return import('@/components/index/_shared/estat/EstatCityRankCard.vue')
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
  setup() {
    // const govType = computed((): GovType => {
    //   return props.contents.govType
    // })
    const data = reactive({
      rows: [[TimeChart, RankChart]],
    })

    return {
      data,
    }
  },
})
</script>
