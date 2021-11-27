import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'

export type EstatParams = {
  statsDataId: string
  cdArea?: string | string[]
  cdCat01?: string[]
  cdCat02?: string[]
  cdTab?: string[]
  cdTime?: string | string[]
}

export type Series = {
  id?: string
  code?: string
  name: string
}

export type StateType = {
  estatParams: EstatParams
  series: Series[]
  latestYearInt: number
  annotation: never[]
}

export const useEstatState = () => {
  const estatState = reactive<StateType>({
    estatParams: null,
    series: null,
    latestYearInt: null,
    annotation: null,
  })

  const setEstatState = (data: StateType): void => {
    estatState.estatParams = data.estatParams
    estatState.series = data.series
    estatState.latestYearInt = data.latestYearInt
    estatState.annotation = data.annotation
  }

  return {
    ...toRefs(estatState),
    setEstatState,
  }
}

export type EstatStateType = ReturnType<typeof useEstatState>
export const EstatStateKey: InjectionKey<EstatStateType> = Symbol('EstatState')
