type estatCategories = {
  name: string
  cdCat01: string | null | undefined
  cdCat02: string | null | undefined
  cdTab: string | null | undefined
}

type Params = {
  statsDataId: string | null | undefined
  categories: estatCategories[] | null | undefined
  apiURL: string | null | undefined
}

export type ContentsType = {
  title: string
  titleId: string
  cardComponent: string
  isRank: boolean | null | undefined
  unit: string | null | undefined
  additionalDescription: string[]
  params: Params | null | undefined
  cdArea: string | null | undefined
}

export type ContentsList = {
  cardComponent: string
  contents: {
    title: string
    titleId: string
    additionalDescription: string
    routes: string
    unit: string | null | undefined
    params: {
      statsDataId: string
      categories: estatCategories[]
      cdArea: string
    }
  }
}

export type FormatDataTimeChart = {
  title: string
  titleId: string
  additionalDescription: string[]
  routes: string

  isRank: boolean | null | undefined
  unit: string | null | undefined
  params: Params | null | undefined
  cdArea: string | null | undefined
}

export type chartData = {
  data: [x: number, y: number, unit: string]
  dataSetPanel: boolean
  max: number
  min: number
  name: string
}

export type GovernmentType = 'prefecture' | 'city' | 'japan'

export type chartList = {
  title: string
  titleId: string
  isRank: boolean
  cardComponent: string
}
