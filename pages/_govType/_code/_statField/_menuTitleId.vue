<template>
  <div>
    <select-gov-type />
    <select-city />
    <select-menu />
    <component :is="cardComponent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { govType, statField, menuTitleId } = params

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType === 'prefecture') {
        return `lazy-cards-${menuTitleId}-prefecture`
      } else {
        return `lazy-cards-${menuTitleId}-city`
      }
    })

    return {
      statField,
      cardComponent,
    }
  },
})
</script>
