import { reactive, toRefs } from '@nuxtjs/composition-api'
import * as topojson from 'topojson-client'

export const useGeojson = (axios) => {
  const state = reactive<any>({
    prefMap: {},
    cityMap: {},
    cityMapDc: {},
  })

  const getData = async () => {
    const { data: topo } = await axios.get(
      'https://geoshape.ex.nii.ac.jp/city/topojson/20200101/jp_pref.c.topojson'
    )

    return topojson.feature(topo, topo.objects.pref)
  }

  return {
    ...toRefs(state),
    getData,
  }
}
