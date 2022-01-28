import { ref, watch } from '@nuxtjs/composition-api'
import { EstatSeries } from '~/types/estat'

export const useSelectSeries = () => {
  const currentSeries = ref<EstatSeries>({})
  watch(currentSeries, () => {
    // console.log(currentSeries)
  })

  const setCurrentSeries = (newSeries: EstatSeries): void => {
    currentSeries.value = newSeries
  }

  return {
    currentSeries,
    setCurrentSeries,
  }
}
