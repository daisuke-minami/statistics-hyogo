import { cloneDeep } from 'lodash'
// import axios from 'axios'

export type Pref = {
  prefCode: number
  prefName: string
}

type State = {
  prefList: Pref[]
  selectedPref: Pref
}

const initialState: State = {
  prefList: [],
  selectedPref: {
    prefCode: 28,
    prefName: '兵庫県',
  },
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getPrefList(state: State) {
    return state.prefList
  },
  getSelectedPrefCode(state: State) {
    return state.selectedPref.prefCode
  },
  getSelectedPref(state: State) {
    return state.selectedPref
  },
  getPrefName: (state: State) => (prefCode: number) => {
    return state.prefList.find((d) => d.prefCode === prefCode).prefName
  },
}

export const mutations = {
  initPrefSet(state: State, payload: Pref[]) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.prefList = payload
    }
  },
}

export const actions = {
  async fetchPrefs({ commit }) {
    const data = await import('~/data/codes/preflist.json')
    commit('initPrefSet', data.result)
  },
}
