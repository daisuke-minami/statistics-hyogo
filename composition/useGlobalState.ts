import {
  reactive,
  toRefs,
  InjectionKey,
  Ref,
  ref,
  isRef,
} from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'
import prefListMaster from '~/data/codes/preflist.json'
import cityListMaster from '~/data/codes/citylist.json'

type GovType = 'prefecture' | 'city'

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
    prefList: prefListMaster.result,
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

  return {
    ...toRefs(state),
    setInitState,
    setCurrentCode,
    setCurrentCity,
    getTitle,
    setState,
    getCurrentCityList,
  }
}

export const StateKey: InjectionKey<GlobalState> = Symbol('State')
export type GlobalState = ReturnType<typeof useGlobalState>
export default useGlobalState

const convertCodeToGovType = (code: string): GovType => {
  return code.slice(-3) === '000' ? 'prefecture' : 'city'
}

const convertCodeToPrefCode = (code: string): number => {
  return +code.slice(0, 2)
}

const getPref = (prefCode: number): Pref => {
  return (
    prefListMaster.result.find((f) => f.prefCode === prefCode) ??
    prefListMaster.result[0]
  )
}

const getCity = (cityCode: string): City => {
  return (
    cityListMaster.result.find((f) => f.cityCode === cityCode) ??
    cityListMaster.result[0]
  )
}

const getCityList = (prefCode: number, bigCityKind: string = 'all'): City[] => {
  const cityListAll = cityListMaster.result.filter(
    (f) => f.prefCode === prefCode
  )

  if (bigCityKind === 'all') {
    return cityListAll
  } else if (bigCityKind === 'join') {
    return cityListAll.filter((f) => f.bigCityFlag !== '1')
  } else {
    return cityListAll.filter((f) => f.bigCityFlag !== '2')
  }
}
