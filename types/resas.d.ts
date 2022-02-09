export type City = {
  prefCode: number
  cityName: string
  cityCode: string
  bigCityFlag: string
}

export type Pref = {
  prefCode: number
  prefName: string
}

export type GovType = 'prefecture' | 'city'

export type ResasParams = {
  prefCode: number
}
