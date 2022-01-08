import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'
import { Pref, City } from '~/types/resas'

// 都道府県リスト、市区町村リストのimport
import prefList from '~/data/codes/preflist.json'
import cityListAll from '~/data/codes/citylist.json'

interface State {
  govType: string
  code: string
  statField: string
  menuTitleId: string
  routingPath: string
  prefList: Pref[]
  cityList: City[]
  selectedPref?: Pref
  selectedCity?: City
}

export const useState = () => {
  const State = reactive<State>({
    govType: 'prefecture',
    code: '28000',
    statField: 'landweather',
    menuTitleId: 'area',
    routingPath: '',
    prefList: prefList.result,
    cityList: [],
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
    code: string = '28000',
    statField: string = 'landweather',
    menuTitleId: string = 'area'
  ): void => {
    State.govType = govType
    State.code = code
    State.statField = statField
    State.menuTitleId = menuTitleId
    State.routingPath = `${code}/${statField}/${menuTitleId}`
    State.cityList = _cityList(code)
    State.selectedPref = prefList.result.find(
      (f) => f.prefCode === Number(code.slice(0, 2))
    )
  }

  const _cityList = (code: string) => {
    return cityListAll.result.filter(
      (f) => f.prefCode === Number(code.slice(0, 2))
    )
  }

  return {
    ...toRefs(State),
    setState,
  }
}

export type StateType = ReturnType<typeof useState>
export const StateKey: InjectionKey<StateType> = Symbol('State')
