<template>
  <div>
    <select-city :stat-field="statField" />
    <select-menu :menu-items="menuItems" />
    <component :is="cardComponent" :contents="contents" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  // useStore,
  provide,
  inject,
} from '@nuxtjs/composition-api'
import {
  usePageState,
  PageStateKey,
  PageStateType,
} from '@/composition/pageState'
import {
  useGovernmentState,
  GovernmentStateKey,
} from '@/composition/government'
import { useContentsState, ContentsStateKey } from '@/composition/contents'
import menuList from '~/data/contents/menulist.json'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const code = computed((): string => {
      return route.value.params.code
    })
    const statField = computed((): string => {
      return route.value.params.statField
    })
    const titleId = computed((): string => {
      return 'total-population'
    })

    // provide
    provide(PageStateKey, usePageState())
    const pageState: PageStateType = inject(PageStateKey)
    pageState.setState(route.value.params)

    provide(GovernmentStateKey, useGovernmentState())
    const state = inject(GovernmentStateKey)
    state.setGovType(code.value)
    state.setSelectedPref(code.value)
    state.setCityList(code.value)

    // // 都道府県or市区町村
    const govType = computed(() => {
      return code.value.match('000') ? 'prefecture' : 'city'
    })

    // provide(contentsState)
    provide(ContentsStateKey, useContentsState())

    const menuItems = computed(() => {
      return menuList[statField.value][govType.value].map((d) => {
        return {
          label: d.menuTitle,
          path: `/${code.value}/${statField.value}/${d.menuTitleId}`,
        }
      })
    })

    // カードコンポーネントの設定
    const cardComponent = computed((): string => `lazy-cards-${titleId.value}`)

    return {
      statField,
      menuItems,
      cardComponent,
    }
  },
})
</script>
