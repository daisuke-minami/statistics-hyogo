import { cloneDeep } from 'lodash'

// type City = {
//   prefCode: number
//   cityName: string
//   cityCode: string
//   bigCityFlag: string
// }

const initialState = {
  cityList: [],
  // selectedCity: null,
}

export const state = () => cloneDeep(initialState)

export const getters = {
  getCityList(state) {
    return state.cityList
  },
  getCity: (state) => (cityCode) => {
    return state.cityList.find((d) => d.cityCode === cityCode)
  },
  // getSelectedCity(state) {
  //   return state.selectedCity
  // },
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
    }
  },
  changeKinds(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.bigcityKind = payload
    }
  },
  // changeCity(state, payload) {
  //   if (payload === null) {
  //     state = cloneDeep(initialState)
  //   } else {
  //     state.selectedCity = payload
  //   }
  // },
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
  // changeSelectedCity({ commit }, newCity) {
  //   commit('changeCity', newCity)
  // },
}
