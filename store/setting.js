import { cloneDeep } from 'lodash'

const initialState = {
  statisticsClassList: [],
  chartClass: null,
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
