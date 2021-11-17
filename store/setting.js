import { cloneDeep } from 'lodash'

import LandWeather from '@/data/pagesetting/landweather.json'
import Population from '@/data/pagesetting/population.json'
import LaborWage from '@/data/pagesetting/laborwage.json'
import Agriculture from '@/data/pagesetting/agriculture.json'
import MiningIndustry from '@/data/pagesetting/miningindustry.json'
import Commercial from '@/data/pagesetting/commercial.json'

const initialState = {
  statisticsClassList: [],
  chartClass: null,
  landweather: LandWeather,
  population: Population,
  laborwage: LaborWage,
  agriculture: Agriculture,
  miningindustry: MiningIndustry,
  commercial: Commercial,
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getStatisticsClassName: (state) => (id) => {
    return state.statisticsClassList.find((f) => f.id === id).name
  },
  getChartClass: (state) => {
    return state.chartClass
  },
  getContentsList: (state) => (id) => {
    return state[`${id}`]
  },
}
export const mutations = {
  initStatisticsClass(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.statisticsClassList = payload
    }
  },
  changeChartClass(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.chartClass = payload
    }
  },
}

export const actions = {
  fetchSetting({ commit }) {
    commit('initStatisticsClass', process.env.statisticsClassList)
    commit('changeChartClass', 'prefecture')
  },
  changeSelectedChartClass({ commit }, newChartClass) {
    commit('changeChartClass', newChartClass)
  },
}
