import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'

interface State {
  govType: string
  code: string
  selectedPref: Pref
  selectedCity: City
}

export const useGlobalState = () => {
  const State = reactive<State>({
    govType: 'prefecture',
    code: '28000',
    selectedPref: {
      prefCode: 28,
      prefName: '兵庫県',
    },
    selectedCity: {
      prefCode: 28,
      cityCode: '28100',
      cityName: '神戸市',
      bigCityFlag: '2',
    },
  })

  const setGovType = (govType: string): void => {
    State.govType = govType
  }

  const setCode = (code: string): void => {
    State.code = code
  }

  return {
    ...toRefs(State),
    setGovType,
    setCode,
  }
}

export type StateType = ReturnType<typeof useGlobalState>
export const StateKey: InjectionKey<StateType> = Symbol('State')
