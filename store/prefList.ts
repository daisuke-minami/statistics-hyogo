import { cloneDeep } from 'lodash'
import { Pref } from '~/types/resas'

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
  getSelectedPref(state: State) {
    return state.selectedPref
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
