import {
  reactive,
  toRefs,
  InjectionKey,
  Ref,
  ref,
  isRef,
} from '@nuxtjs/composition-api'
import {
  convertCodeToGovType,
  convertCodeToPrefCode,
  getCity,
  getCityList,
  getPref,
} from '@/composition/utils/formatResas'
import { Pref, City, GovType } from '~/types/resas'

interface State {
  currentGovType: GovType
  currentCode: string
  currentPref: Pref
  currentCity: City
  prefList: Pref[]
  cityList: City[]
}

export const useGlobalState = () => {
  const state = reactive<State>({
    currentGovType: 'prefecture',
    currentCode: '28000',
    currentPref: {
      prefCode: 28,
      prefName: '兵庫県',
    },
    currentCity: {
      prefCode: 28,
      cityCode: '28100',
      cityName: '神戸市',
      bigCityFlag: '2',
    },
    prefList: [],
    cityList: [],
  })

  const setCurrentCode = (code: string): void => {
    state.currentCode = code
  }
  const setCurrentCity = (newCity: Ref<City> | City): void => {
    state.currentCity = isRef(newCity) ? newCity : ref(newCity)
  }

  // stateの一括設定
  const setState = (code: string): void => {
    const prefCode = convertCodeToPrefCode(code)
    const govType = convertCodeToGovType(code)
    state.currentGovType = govType
    state.currentCode = code
    state.currentPref = getPref(prefCode)
    state.currentCity = getCity(code)
    state.cityList = getCityList(prefCode)
  }

  // stateの初期設定
  const initCode = '28100'
  const setInitState = (): void => {
    setState(initCode)
  }

  const getTitle = (title: string): string => {
    return state.currentGovType === 'prefecture'
      ? `${state.currentPref.prefName}の${title}`
      : `${state.currentCity.cityName}の${title}`
  }

  const getCurrentCityList = (kind: string): City[] => {
    return getCityList(state.currentPref.prefCode, kind)
  }

  const getCurrentPrefList = (): Pref[] => {
    return state.prefList
  }

  return {
    ...toRefs(state),
    setInitState,
    setCurrentCode,
    setCurrentCity,
    getTitle,
    setState,
    getCurrentCityList,
    getCurrentPrefList,
  }
}

export const StateKey: InjectionKey<GlobalState> = Symbol('State')
export type GlobalState = ReturnType<typeof useGlobalState>
export default useGlobalState
