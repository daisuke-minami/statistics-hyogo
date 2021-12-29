<template>
  <div>
    <select-city :stat-field="statField" />
    <select-menu />
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
    const { code, statField } = params
    const titleId = computed((): string => {
      return 'total-population'
    })

    // provide
    provide(PageStateKey, usePageState())
    const pageState = inject(PageStateKey)
    pageState.setState(code, statField, titleId)

    return {
      statField,
    }
  },
})
</script>
