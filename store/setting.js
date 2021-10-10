import { cloneDeep } from 'lodash'

const initialState = {
  statisticsClassList: [],
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getStatisticsClassName: (state) => (id) => {
    return state.statisticsClassList.find((f) => f.id === id).name
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
}

export const actions = {
  fetchSetting({ commit }) {
    commit('initStatisticsClass', process.env.statisticsClassList)
  },
}
