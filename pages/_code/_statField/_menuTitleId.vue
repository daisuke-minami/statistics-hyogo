<template>
  <div>
    <select-city :stat-field="statField" />
    <select-menu :menu-items="menuItems" />
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
import {
  usePageState,
  PageStateKey,
  PageStateType,
} from '@/composition/pageState'
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
    const menuTitleId = computed((): string => {
      return route.value.params.menuTitleId
    })

    // 都道府県or市区町村
    const govType = computed((): string => {
      return code.value.match('000') ? 'prefecture' : 'city'
    })

    // provide
    provide(PageStateKey, usePageState())
    const pageState: PageStateType = inject(PageStateKey)
    pageState.setState(route.value.params)

    const menuItems = computed(() => {
      return menuList[statField.value][govType.value].map((d) => {
        return {
          label: d.menuTitle,
          path: `/${code.value}/${statField.value}/${d.menuTitleId}`,
        }
      })
    })

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType.value === 'prefecture') {
        return `lazy-cards-${menuTitleId.value}-prefecture`
      } else {
        return `lazy-cards-${menuTitleId.value}-city`
      }
    })

    return {
      statField,
      menuItems,
      cardComponent,
    }
  },
})
</script>
