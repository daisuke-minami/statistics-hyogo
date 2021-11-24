<template>
  <cards-lazy-row :rows="data.rows" :contents="contents" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, computed, reactive } from '@nuxtjs/composition-api'
import { Contents, GovType } from '@/store/setting'

type Props = {
  contents: Contents
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
  setup(props: Props) {
    // TimeChart
    const TimeChart = () => {
      return import(
        '@/components/index/_shared/estat/EstatTimeChartSingleMulti.vue'
      )
    }
    // RankChart
    const govType = computed((): GovType => {
      return props.contents.govType
    })
    const RankChart = () => {
      if (govType.value === 'prefecture') {
        return import('@/components/index/_shared/estat/EstatPrefRankCard.vue')
      } else {
        return import('@/components/index/_shared/estat/EstatCityRankCard.vue')
      }
    }
    const data = reactive({
      rows: [[TimeChart, RankChart]],
    })

    return {
      data,
    }
  },
})
</script>
