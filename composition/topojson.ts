import {
  reactive,
  toRefs,
  useFetch,
  InjectionKey,
} from '@nuxtjs/composition-api'
import axios from 'axios'
// import * as topojson from 'topojson-client'

export const useTopojsonState = () => {
  useFetch(async () => {
    const res = await Promise.all([
      axios.get(
        'https://geoshape.ex.nii.ac.jp/city/topojson/20200101/jp_pref.c.topojson'
      ),
      axios.get(
        'https://geoshape.ex.nii.ac.jp/city/topojson/20200101/28/28_city_dc.l.topojson'
      ),
      axios.get(
        'https://geoshape.ex.nii.ac.jp/city/topojson/20200101/28/28_city.l.topojson'
      ),
    ]).then(([a, b, c]) => {
      const data = {}
      data.a = a.data
      data.b = b.data
      data.c = c.data
      return Promise.resolve(data)
    })

    topojsonState.prefMap = res.a
    topojsonState.cityMapDc = res.b
    topojsonState.cityMap = res.c
  })

  const topojsonState = reactive<StateType>({
    prefMap: null,
    cityMapDc: null,
    cityMap: null,
  })

  return {
    ...toRefs(topojsonState),
  }
}

export type TopojsonStateType = ReturnType<typeof useTopojsonState>
export const TopojsonStateKey: InjectionKey<TopojsonStateType> =
  Symbol('TopojsonState')
