import { cloneDeep } from 'lodash'
import axios from 'axios'
import * as topojson from 'topojson-client'

const initialState = {
  prefMapDc: null,
  prefMap: null,
  japanMap: null,
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getMaps(state) {
    function _convTopoJsonToGeoJson(topo, obj) {
      return topojson.feature(topo, topo.objects[obj])
    }
    return {
      prefMapDc: _convTopoJsonToGeoJson(state.prefMapDc, 'city'),
      prefMap: _convTopoJsonToGeoJson(state.prefMap, 'city'),
      japanMap: _convTopoJsonToGeoJson(state.japanMap, 'pref'),
    }
  },
}
export const mutations = {
  initMapsSet(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.japanMap = payload.a
      state.prefMapDc = payload.b
      state.prefMap = payload.c
    }
  },
}

export const actions = {
  async fetchMaps({ commit }) {
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
    commit('initMapsSet', res)
  },
}
