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
  async fetchCities({ commit }) {
    const data = await import('~/data/codes/citylist.json')
    if (data.result) commit('initCitySet', data.result)
  },
}
