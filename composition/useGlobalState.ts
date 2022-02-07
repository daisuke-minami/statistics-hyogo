import { reactive, toRefs, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'
import prefListMaster from '~/data/codes/preflist.json'
import cityListMaster from '~/data/codes/citylist.json'

interface State {
  currentGovType: string
  currentCode: string
  currentPref: Pref
  currentCity: City
  prefList: Pref[]
  cityList: City[]
}

export const useGlobalState = () => {
  const State = reactive<State>({
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
    cityList: cityListMaster.result,
  })

  const setCurrentGovType = (newGovType: string): void => {
    State.currentGovType = newGovType
  }
  const setCurrentCode = (newCode: string): void => {
    State.currentCode = newCode
  }
  const setCurrentCity = (newCity: Ref<City>): void => {
    State.currentCity = newCity
  }

  const getTitle = (title: string): string => {
    return State.currentGovType === 'prefecture'
      ? `${State.currentPref.prefName}の${title}`
      : `${State.currentCity.cityName}の${title}`
  }

  return {
    ...toRefs(State),
    setCurrentGovType,
    setCurrentCode,
    setCurrentCity,
    getTitle,
  }
}

// const convertCodeToPrefCode = (code: string): number => {
//   return Number(code.slice(0, 2))
// }

// const setCurrentPref = (code: string): void => {
//   const prefCode = convertCodeToPrefCode(code)
//   State.currentPref = prefListMaster.result.find((f) => f.prefCode === prefCode)
// }

// const setCurrentCity = (code: string): void => {
//   State.currentCity = cityListMaster.result.find((f) => f.cityCode === code)
// }

// const setCityList = (code: string): void => {
//   const prefCode = convertCodeToPrefCode(code)
//   State.cityList = cityListMaster.result.filter((f) => f.prefCode === prefCode)
// }

// const getCity = (code: string) = void =>{
//   retunr null
// }

export type StateType = ReturnType<typeof useGlobalState>
export const StateKey: InjectionKey<StateType> = Symbol('State')
