import { reactive, toRefs, InjectionKey } from '@vue/composition-api'

export type StateType = {
  title: string
  titleId: string
  routingPath: string
}

export const useCardState = () => {
  const cardInformationState = reactive<StateType>({
    title: null,
    titleId: null,
    routingPath: null,
  })

  const setTitle = (title: string): void => {
    cardInformationState.title = title
  }

  const setTitleId = (titleId: string): void => {
    cardInformationState.titleId = titleId
  }

  const setRoutingPath = (routingPath: string): void => {
    cardInformationState.routingPath = routingPath
  }

  return {
    ...toRefs(cardInformationState),
    setTitle,
    setTitleId,
    setRoutingPath,
  }
}

export type CardStateType = ReturnType<typeof useCardState>
export const CardStateKey: InjectionKey<CardStateType> = Symbol('Card')
