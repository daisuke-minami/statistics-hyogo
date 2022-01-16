import { reactive, toRefs } from '@nuxtjs/composition-api'
import { Pref } from '~/types/resas'
import prefList from '~/data/codes/preflist.json'

interface State {
  prefList: Pref[]
  selectedPref: Pref
}

export const usePrefecture = () => {
  const state = reactive<State>({
    prefList: prefList.result,
    selectedPref: {
      prefCode: 28,
      prefName: '兵庫県',
    },
  })

  return {
    ...toRefs(state),
  }
}
