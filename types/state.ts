import { Pref, City } from '@/types/resas'

export type StateType = {
  code: string
  statField: string
  routingPath: string
  prefList: Pref[]
  cityList: City[]
  selectedPref?: Pref
  selectedCity?: City
  govType: string
}

export type RouteParams = {
  code: string
  statField: string
  menuTitleId: string
}
