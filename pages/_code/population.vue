<template>
  <div>
    <select-city :stat-field="statField" />
    <select-title />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { Contents } from '@/store/setting'

type Government = 'prefecture' | 'city'

export default defineComponent({
  setup() {
    // パスパラメータから市区町村コードを取得
    const route = useRoute()
    const code = computed((): string => {
      return route.value.params.code
    })

    // 都道府県or市区町村
    const govType = computed((): Government => {
      return code.value.match('000') ? 'prefecture' : 'city'
    })

    // 統計分野
    const statField = ref<string>('population')

    // ストアから統計項目リストを取得
    const store = useStore()
    const contentsList = computed((): Contents[] =>
      store.getters['setting/getTitleList'](statField.value, govType.value)
    )
    console.log(contentsList)

    return {
      statField,
      code,
      // cardComponent,
    }
  },
})
</script>
