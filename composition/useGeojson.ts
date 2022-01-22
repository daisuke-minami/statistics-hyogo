import { reactive, toRefs } from '@nuxtjs/composition-api'
import * as topojson from 'topojson-client'

export const useGeojson = (axios) => {
  const cityMapAll = async () => {
    const { data: topo } = await axios.get(
      'https://geoshape.ex.nii.ac.jp/city/topojson/20210101/28/28_city_dc.l.topojson'
    )

    return topojson.feature(topo, topo.objects.city)
  }
  const cityMapBreak = async () => {
    const { data: topo } = await axios.get(
      'https://geoshape.ex.nii.ac.jp/city/topojson/20210101/28/28_city.l.topojson'
    )

    return topojson.feature(topo, topo.objects.city)
  }

  const state = reactive<any>({
    prefMap: {},
    cityMapAll: cityMapAll(),
    cityMapBreak: cityMapBreak(),
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
