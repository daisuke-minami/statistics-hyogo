import { cloneDeep } from 'lodash'

// コンテンツ情報
import LandWeather from '@/data/pagesetting/landweather.json'
import Population from '@/data/pagesetting/population.json'
import LaborWage from '@/data/pagesetting/laborwage.json'
import Agriculture from '@/data/pagesetting/agriculture.json'
import MiningIndustry from '@/data/pagesetting/miningindustry.json'
import Commercial from '@/data/pagesetting/commercial.json'
import Economy from '@/data/pagesetting/economy.json'
import Construction from '@/data/pagesetting/construction.json'
import Energy from '@/data/pagesetting/energy.json'
import Tourism from '@/data/pagesetting/tourism.json'
import EducationSports from '@/data/pagesetting/educationsports.json'
import Administrativefinancial from '@/data/pagesetting/administrativefinancial.json'
import Safetyenvironment from '@/data/pagesetting/safetyenvironment.json'
import SocialSecurity from '@/data/pagesetting/socialsecurity.json'
import International from '@/data/pagesetting/international.json'
import Other from '@/data/pagesetting/other.json'

// 型定義
import { EstatParams } from '@/plugins/estat'

export type Series = {
  id: string
  code: string
  name: string
}

export type GovType = 'prefecture' | 'city'

export type Contents =
  | {
      title: string
      titleId: string
      annotation: string[]
      estatParams: EstatParams
      series: Series[]
      govType: string
      selectedPref: Object
      selectedCity: Object
    }
  | undefined

const initialState = {
  statFieldList: [],
  chartClass: null,
  landweather: LandWeather,
  population: Population,
  laborwage: LaborWage,
  agriculture: Agriculture,
  miningindustry: MiningIndustry,
  commercial: Commercial,
  economy: Economy,
  construction: Construction,
  energy: Energy,
  tourism: Tourism,
  educationsports: EducationSports,
  administrativefinancial: Administrativefinancial,
  safetyenvironment: Safetyenvironment,
  socialsecurity: SocialSecurity,
  international: International,
  other: Other,
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getStatisticsClassName: (state) => (id) => {
    return state.statFieldList.find((f) => f.id === id).name
  },
  getChartClass: (state) => {
    return state.chartClass
  },
  getTitleList: (state) => (statField, govType) => {
    return state[`${statField}`][`${govType}`]
  },
}
export const mutations = {
  initStatisticsClass(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.statFieldList = payload
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
    commit('initStatisticsClass', process.env.statFieldList)
    commit('changeChartClass', 'prefecture')
  },
  changeSelectedChartClass({ commit }, newChartClass) {
    commit('changeChartClass', newChartClass)
  },
}
