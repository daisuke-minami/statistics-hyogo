import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'

interface State {
  govType: string
  code: string
  selectedPref?: Pref
  selectedCity?: City
}

export const useState = () => {
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

  const setState = (
    govType: string = 'prefecture',
    code: string = '28000'
  ): void => {
    State.govType = govType
    State.code = code
  }

  return {
    ...toRefs(State),
    setState,
  }
}

export type StateType = ReturnType<typeof useState>
export const StateKey: InjectionKey<StateType> = Symbol('State')
