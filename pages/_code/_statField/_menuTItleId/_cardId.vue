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
import { usePageState, PageStateKey } from '@/composition/pageState'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { code, statField, menuTitleId, cardId } = params
    console.log({ params })

    // provide
    provide(PageStateKey, usePageState())
    const pageState = inject(PageStateKey)
    pageState.setState(code, statField, menuTitleId)
    const { govType } = pageState

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
