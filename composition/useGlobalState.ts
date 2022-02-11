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
  getPrefList,
} from '@/composition/utils/formatResas'
import { Pref, City, GovType } from '~/types/resas'

interface State {
  currentGovType: GovType
  currentCode: string
  currentFieldId: string
  currentMenuId: string
  currentPref: Pref
  currentCity: City
  prefList: Pref[]
  cityList: City[]
}

export const useGlobalState = () => {
  const state = reactive<State>({
    currentGovType: '',
    currentCode: '',
    currentFieldId: '',
    currentMenuId: '',
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
    prefList: getPrefList(),
    cityList: getCityList(28),
  })

  const setCurrentCode = (code: string): void => {
    state.currentCode = code
  }
  const setCurrentCity = (newCity: Ref<City> | City): void => {
    state.currentCity = isRef(newCity) ? newCity : ref(newCity)
  }

  // stateの一括設定
  const setState = (params): void => {
    const { code, fieldId, menuId } = params
    const prefCode = convertCodeToPrefCode(code)
    const govType = convertCodeToGovType(code)
    state.currentGovType = govType
    state.currentCode = code
    state.currentFieldId = fieldId
    state.currentMenuId = menuId
    state.currentPref = getPref(prefCode)
    state.currentCity = getCity(code)
    state.cityList = getCityList(prefCode)
    state.prefList = getPrefList()
  }

  const setPrefecture = (code: string): void => {
    const prefCode = convertCodeToPrefCode(code)
    state.currentCode = code
    state.currentPref = getPref(prefCode)
  }

  // stateの初期設定
  const initParams = {
    govType: 'city',
    code: '28100',
    fieldId: 'landweather',
    menuId: 'area',
  }
  const setInitState = (): void => {
    setState(initParams)
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
    setPrefecture,
    getCurrentCityList,
    getCurrentPrefList,
  }
}

export const StateKey: InjectionKey<GlobalState> = Symbol('State')
export type GlobalState = ReturnType<typeof useGlobalState>
export default useGlobalState
