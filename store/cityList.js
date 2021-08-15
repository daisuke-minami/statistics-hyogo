import { cloneDeep } from 'lodash'
// import axios from 'axios'

const initialState = {
  cityList: [],
  selectedCityCode: null,
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getCityList(state) {
    return state.cityList
  },
  getSelectedCityCode(state) {
    return state.selectedCityCode
  },
  getCityName: (state) => (cityCode) => {
    return state.cityList.find((d) => d.cityCode === cityCode).cityName
  },
}
export const mutations = {
  initCitySet(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.cityList = payload
      state.selectedCityCode = payload[0].cityCode
    }
  },
  changeKinds(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.bigcityKind = payload
    }
  },
  changeCity(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.selectedCityCode = payload
    }
  },
}

export const actions = {
  // RESAS-APIから取得する場合
  // async fetchCities({ commit }) {
  //   const res = await axios.get(
  //     'https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=28',
  //     {
  //       headers: {
  //         'X-API-KEY': process.env.API_KEY,
  //       },
  //     }
  //   )
  //   if (res.data.result) commit('initCitySet', res.data.result)
  // },
  // 環境変数から取得する場合
  fetchCities({ commit }) {
    commit('initCitySet', process.env.cityList)
  },
  changeSelectedCity({ commit }, newCity) {
    commit('changeCity', newCity)
  },
}
