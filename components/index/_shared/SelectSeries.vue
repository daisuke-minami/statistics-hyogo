<template>
  <v-select
    v-model="selectedSeries"
    :items="series"
    item-text="name"
    item-value="name"
    return-object
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  Ref,
  ref,
} from '@nuxtjs/composition-api'
import { useSelectSeries } from '@/composition/useSelectSeries'
import { EstatSeries } from '~/types/estat'

export default defineComponent({
  props: {
    series: {
      type: Array as PropType<EstatSeries[]>,
      required: true,
    },
  },
  setup(props) {
    const { currentSeries, setCurrentSeries } = useSelectSeries()

    const selectedSeries = ref<Ref<EstatSeries>>(currentSeries)
    onMounted(() => {
      setCurrentSeries(props.series[0])
    })

    return {
      selectedSeries,
    }
  },
})
</script>
