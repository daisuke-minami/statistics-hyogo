import { reactive, toRefs, InjectionKey } from '@nuxtjs/composition-api'

const _formatTime = (yearInt: number) => {
  return {
    yearInt,
    yearStr: `${yearInt}100000`,
    yearName: `${yearInt}年`,
  }
}

export const useEstatState = () => {
  const estatState = reactive<StateType>({
    estatParams: null,
    series: null,
    latestYear: null,
    annotation: null,
  })

  const setEstatState = (data: StateType): void => {
    estatState.estatParams = data.estatParams
    estatState.series = data.series
    estatState.latestYear = _formatTime(data.latestYear.yearInt)
    estatState.annotation = data.annotation
  }

  return {
    ...toRefs(estatState),
    setEstatState,
  }
}

export type EstatStateType = ReturnType<typeof useEstatState>
export const EstatStateKey: InjectionKey<EstatStateType> = Symbol('EstatState')
