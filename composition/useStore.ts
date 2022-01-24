import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'

interface State {
  govType: string
  code: string
  currentPref: Pref
  currentCity: City
}

export const useStore = () => {
  const state = reactive<State>({
    govType: 'prefecture',
    code: '28000',
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

  const setGovType = (govType: string): void => {
    state.govType = govType
  }
  const setCode = (code: string): void => {
    state.code = code
  }
  const setCurrentCity = (newCity: City): void => {
    state.currentCity = newCity
  }

  return {
    ...toRefs(state),
    setGovType,
    setCode,
    setCurrentCity,
  }
}

export type StateType = ReturnType<typeof useStore>
export const StateKey: InjectionKey<StateType> = Symbol('State')
