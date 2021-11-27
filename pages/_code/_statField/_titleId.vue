<template>
  <div>
    <select-city :stat-field="statField" />
    <select-title :title-items="titleItems" />
    <component :is="cardComponent" :contents="contents" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { Contents } from '@/store/setting'
import { Pref } from '~/store/prefList'
import { City } from '~/store/cityList'

type Government = 'prefecture' | 'city'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const store = useStore()
    const code = computed((): string => {
      return route.value.params.code
    })
    const statField = computed((): string => {
      return route.value.params.statField
    })
    const titleId = computed((): string => {
      return 'total-population'
    })

    // 都道府県or市区町村
    const govType = computed((): Government => {
      return code.value.match('000') ? 'prefecture' : 'city'
    })
    const selectedPref = computed(
      (): Pref => store.getters['prefList/getSelectedPref']
    )
    const selectedCity = computed((): City => {
      return govType.value === 'prefecture'
        ? {}
        : store.getters['cityList/getCity'](code.value)
    })

    // ストアから統計項目を取得
    const contentsList = computed((): Contents[] =>
      store.getters['setting/getTitleList'](statField.value, govType.value)
    )
    // console.log(contentsList)

    const contents: Contents = computed(() => {
      const c: Contents = contentsList.value.find(
        (f) => f.titleId === titleId.value
      )
      // console.log(c)
      return {
        govType: govType.value,
        selectedPref: selectedPref.value,
        selectedCity: selectedCity.value,
        title: c.title,
        titleId: c.titleId,
        annotation: c.annotation,
        routingPath: `/${code.value}/${statField.value}/${titleId.value}`,
      }
    })

    // タイトル一覧を設定
    const titleItems = contentsList.value.map((d: Contents) => {
      return {
        label: d.title,
        path: `/${code.value}/${statField.value}/${d.titleId}`,
      }
    })

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType.value === 'prefecture') {
        return `lazy-cards-${titleId.value}-pref`
      } else {
        return `lazy-cards-${titleId.value}-city`
      }
    })

    return {
      statField,
      code,
      titleItems,
      cardComponent,
      contents,
    }
  },
})
</script>
