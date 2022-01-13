<template>
  <div>
    <select-gov-type />
    <v-row>
      <v-col cols="12" md="6">
        <select-menu />
      </v-col>
      <v-col v-if="isCity" cols="12" md="6">
        <select-city />
      </v-col>
    </v-row>
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

    // 市区町村判定フラグ
    const isCity = computed(() => {
      if (govType === 'city') {
        return true
      } else {
        return false
      }
    })

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType === 'prefecture') {
        return `lazy-cards-${menuId}-prefecture`
      } else {
        return `lazy-cards-${menuId}-city`
      }
    })

    return {
      isCity,
      cardComponent,
    }
  },
})
</script>
