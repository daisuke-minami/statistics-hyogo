import { cloneDeep } from 'lodash'
// import axios from 'axios'

const initialState = {
  prefList: [],
  selectedPrefCode: 28,
  selectedPref: {
    prefCode: 28,
    prefName: '兵庫県',
  },
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getPrefList(state) {
    return state.prefList
  },
  getSelectedPrefCode(state) {
    return state.selectedPrefCode
  },
  getSelectedPref(state) {
    return state.selectedPref
  },
  getPrefName: (state) => (prefCode) => {
    return state.prefList.find((d) => d.prefCode === prefCode).prefName
  },
}
export const mutations = {
  initPrefSet(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.prefList = payload
    }
  },
}

export const actions = {
  // RESAS-APIから取得する場合
  // async fetchPrefs({ commit }) {
  //   const res = await axios.get(
  //     'https://opendata.resas-portal.go.jp/api/v1/prefectures',
  //     {
  //       headers: {
  //         'X-API-KEY': process.env.API_KEY,
  //       },
  //     }
  //   )
  //   if (res.data.result) commit('initPrefSet', res.data.result)
  // },
  // 環境変数から取得する場合
  fetchPrefs({ commit }) {
    commit('initPrefSet', process.env.prefList)
  },
}
