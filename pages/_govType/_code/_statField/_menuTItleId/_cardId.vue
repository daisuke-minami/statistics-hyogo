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
  provide,
  inject,
} from '@nuxtjs/composition-api'
import { useState, StateKey } from '@/composition/useState'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { code, statField, menuTitleId, cardId } = params

    // provide
    provide(StateKey, useState())
    const State = inject(StateKey)
    State.setState(code, statField, menuTitleId)
    const { govType } = State

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType.value === 'prefecture') {
        return `lazy-${cardId}-prefecture`
      } else {
        return `lazy-${cardId}-city`
      }
    })

    return {
      statField,
      cardComponent,
    }
  },
})
</script>
