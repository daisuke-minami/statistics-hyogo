import { cloneDeep } from 'lodash'

export type City = {
  prefCode: number
  cityName: string
  cityCode: string
  bigCityFlag: string
}

type State = {
  cityList: City[]
}

const initialState: State = {
  cityList: [],
}

export const state = () => cloneDeep(initialState)

export const getters = {
  getCityList(state: State) {
    return state.cityList
  },
  getCity: (state: State) => (cityCode: string) => {
    return state.cityList.find((d) => d.cityCode === cityCode)
  },
  getCityName: (state: State) => (cityCode: string) => {
    return state.cityList.find((d) => d.cityCode === cityCode).cityName
  },
}
export const mutations = {
  initCitySet(state: State, payload: City[]) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.cityList = payload
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
}
