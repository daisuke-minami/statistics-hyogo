// import { tsExternalModuleReference } from '@babel/types'
import { cloneDeep } from 'lodash'

const initialState = {
  pageSetting: {},
  // landaweather: {},
  // test: {},
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getPageSetting: (state) => (statisticsClass) => {
    // console.log(statisticsClass)
    return state.pageSetting[statisticsClass]
  },
}
export const mutations = {
  initPageSet(state, payload) {
    // if (payload === null) {
    //   state = cloneDeep(initialState)
    // } else {
    state.pageSetting = payload
    // }
  },
}

export const actions = {
  async fetchPageSetting({ commit }) {
    // const res = await import(`~/static/pagesetting/landweather.json`)
    // console.log('res', res)
    // const res = await statisticClassList.reduce(async (acc, cur) => {
    //   let key = cur
    //   // console.log('cur', cur)
    //   let data = await import(`~/static/pagesetting/${cur}.json`)
    //   // if (!acc[cur]) {
    //   //   acc[cur] = {}
    //   // }
    //   console.log(data)
    //   acc[key] = {}
    //   // acc[cur].prefecture = data.prefecture
    //   // acc[cur].city = data.city
    //   // acc[key].push(data)
    //   return acc
    // }, {})
    // // console.log('res', res)
    const res = {}
    for (const statisticsClass of statisticClassList) {
      const data = await import(`~/static/pagesetting/${statisticsClass}.json`)
      res[statisticsClass] = data
    }
    // console.log(res)
    commit('initPageSet', res)
  },
}

const statisticClassList = [
  'landweather',
  'population',
  'laborwage',
  'agriculture',
  'miningindustry',
  'commercial',
  'economy',
  'construction',
  'energy',
  'tourism',
  'educationsports',
  'administrativefinancial',
  'safetyenvironment',
  'socialsecurity',
  'international',
  'other',
]
