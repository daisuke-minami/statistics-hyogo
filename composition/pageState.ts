import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'
import { StateType } from '@/types/state'

// 都道府県リスト、市区町村リストのimport
import prefList from '~/data/codes/preflist.json'
import cityListAll from '~/data/codes/citylist.json'

export const usePageState = () => {
  const pageState = reactive<StateType>({
    code: '28000',
    statField: 'landweather',
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
    pageState.code = code
    pageState.statField = statField
    pageState.routingPath = `${code}/${statField}/${menuTitleId}`
    pageState.govType = code.match('000') ? 'prefecture' : 'city'
    pageState.cityList = _cityList(code)
    pageState.selectedPref = prefList.result.find(
      (f) => f.prefCode === Number(code.slice(0, 2))
    )
    pageState.selectedCity = _cityList(code).find((f) => f.cityCode === code)
  }

  // function toFiveDigit(code: number): string {
  //   return ('0000000000' + code).slice(-2) + '000'
  // }

  const _cityList = (code: string) => {
    return cityListAll.result.filter(
      (f) => f.prefCode === Number(code.slice(0, 2))
    )
  }

  return {
    ...toRefs(pageState),
    setState,
  }
}

export type PageStateType = ReturnType<typeof usePageState>
export const PageStateKey: InjectionKey<PageStateType> = Symbol('PageState')
