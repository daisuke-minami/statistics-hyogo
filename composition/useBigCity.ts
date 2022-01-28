import { ref, watch } from '@nuxtjs/composition-api'

export type BigCityKind = 'join' | 'split'

export const useBigCity = () => {
  const bigCityKind = ref<BigCityKind>('join')
  watch(bigCityKind, () => {
    // console.log(bigCityKind)
  })
  // const setBigCityKind = (newKind: BigCityKind): void => {
  //   bigCityKind.value = newKind
  // }

  return {
    bigCityKind,
    // setBigCityKind,
  }
}
