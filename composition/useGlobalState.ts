import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'

interface State {
  govType: string
  code: string
  currentPref: Pref
  currentCity: City
}

export const useGlobalState = () => {
  const State = reactive<State>({
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
    // console.log({ govType })
    State.govType = govType
  }

  const setCode = (code: string): void => {
    // console.log({ code })
    State.code = code
  }

  const setCurrentCity = (newCity: City): void => {
    // console.log({ newCity })
    State.currentCity = newCity
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
