import { Pref, City } from '@/types/resas'

export type GovType = 'prefecture' | 'city'

export type StateType = {
  code: string
  statField: string
  routingPath: string
  prefList: Pref[]
  cityList: City[]
  selectedPref?: Pref
  selectedCity?: City
  govType: GovType
}

export type RouteParams = {
  code: string
  statField: string
  menuTitleId: string
}
