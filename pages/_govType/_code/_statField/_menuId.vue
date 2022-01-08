<template>
  <div>
    <select-gov-type />
    <select-city />
    <select-menu />
    <component :is="cardComponent" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { govType, code, statField, menuId } = params

    // Stateをセット
    const State = inject(StateKey)
    State.setState(govType, code, statField, menuId)

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType === 'prefecture') {
        return `lazy-cards-${menuId}-prefecture`
      } else {
        return `lazy-cards-${menuId}-city`
      }
    })

    return {
      statField,
      cardComponent,
    }
  },
})
</script>
