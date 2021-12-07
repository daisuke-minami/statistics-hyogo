export type City =
  | {
      prefCode: number
      cityName: string
      cityCode: string
      bigCityFlag: string
    }
  | undefined

export type Pref = {
  prefCode: number
  prefName: string
}
