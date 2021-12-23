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
  statField: string
  routingPath: string
  prefList: Pref[]
  cityList: City[]
  selectedPref: Pref
  selectedCity: City
  govType: GovType
}

export type RouteParams = {
  code: string
  statField: string
  menuTitleId: string
}

export const usePageState = () => {
  const pageState = reactive<StateType>({
    code: '28000',
    statField: '',
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
    govType: 'prefecture',
  })

  const setState = (
    code: string,
    statField: string,
    menuTitleId: string
  ): void => {
    // const code: = code
    // const statField: string = statField
    // const menuTitleId: string = menuTitleId

    pageState.code = code
    pageState.statField = statField
    pageState.routingPath = `/${code}/${statField}/${menuTitleId}`
    pageState.govType = code.match('000') ? 'prefecture' : 'city'
    pageState.cityList = _cityList(code)
    pageState.selectedPref = prefList.result.find(
      (f: Pref) => f.prefCode === Number(code.slice(0, 2))
    )
    pageState.selectedCity = _cityList(code).find(
      (f: City) => f.cityCode === code
    )
  }

  const _cityList = (code: string): City[] => {
    return cityListAll.result.filter(
      (f: City) => f.prefCode === Number(code.slice(0, 2))
    )
  }

  return {
    ...toRefs(pageState),
    setState,
  }
}

export type PageStateType = ReturnType<typeof usePageState>
export const PageStateKey: InjectionKey<PageStateType> = Symbol('PageState')
