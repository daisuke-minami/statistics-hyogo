import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'

// 都道府県リスト、市区町村リストのimport
import prefList from '~/data/codes/preflist.json'
import cityListAll from '~/data/codes/citylist.json'

export type Pref = {
  prefCode: number
  prefName: string
}
export type City = {
  prefCode: number
  cityName: string
  cityCode: string
  bigCityFlag: string
}

export type GovType = 'prefecture' | 'city'

export type StateType = {
  code: string
  prefList: Pref[]
  cityList: City[]
  selectedPref: Pref
  selectedCity: City
  govType: GovType
}

export const useGovernmentState = () => {
  const governmentState = reactive<StateType>({
    code: null,
    prefList: prefList.result,
    cityList: null,
    selectedPref: null,
    selectedCity: null,
    govType: null,
  })

  const setGovType = (code: string) => {
    governmentState.govType = code.match('000') ? 'prefecture' : 'city'
  }

  const setCode = (code: string) => {
    governmentState.code = code
  }

  const setCityList = (code: string): City[] => {
    const cityList: City[] = cityListAll.result.filter(
      (f: City) => f.prefCode === Number(code.slice(0, 2))
    )
    governmentState.cityList = cityList
    return cityList
  }

  const setSelectedPref = (code: string): void => {
    governmentState.selectedPref = prefList.result.find(
      (f: Pref) => f.prefCode === Number(code.slice(0, 2))
    )
  }

  const setSelectedCity = (code: string): void => {
    const cityList: City[] = setCityList(code)
    governmentState.selectedCity = cityList.find(
      (f: City) => f.cityCode === code
    )
  }

  return {
    ...toRefs(governmentState),
    setCode,
    setGovType,
    setCityList,
    setSelectedPref,
    setSelectedCity,
  }
}

export type GovernmentStateType = ReturnType<typeof useGovernmentState>
export const GovernmentStateKey: InjectionKey<GovernmentStateType> =
  Symbol('GovernmentState')
