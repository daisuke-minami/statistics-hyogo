<template>
  <div>
    <component :is="cardComponent" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  inject,
} from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { govType, code, statField, menuId, cardId } = params

    // Stateをセット
    const State = inject(StateKey)
    State.setState(govType, code, statField, menuId)

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType === 'prefecture') {
        return `lazy-${cardId}-prefecture`
      } else {
        return `lazy-${cardId}-city`
      }
    })
    // console.log(cardComponent)

    return {
      statField,
      cardComponent,
    }
  },
})
</script>
