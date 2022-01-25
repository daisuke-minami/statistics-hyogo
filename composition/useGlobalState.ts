import { reactive, toRefs, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'

interface State {
  currentGovType: string
  currentCode: string
  currentPref: Pref
  currentCity: City
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
  })

  const setGovType = (newGovType: string): void => {
    State.currentGovType = newGovType
  }
  const setCode = (newCode: string): void => {
    State.currentCode = newCode
  }
  const setCurrentCity = (newCity: Ref<City>): void => {
    State.currentCity = newCity.value
  }

  return {
    ...toRefs(State),
    setGovType,
    setCode,
    setCurrentCity,
  }
}

export type StateType = ReturnType<typeof useGlobalState>
export const StateKey: InjectionKey<StateType> = Symbol('State')
