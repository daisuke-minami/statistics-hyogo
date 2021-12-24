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
// import menuList from '~/data/contents/menulist.json'
import contents from '~/data/contents/contents.json'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { code, statField, menuTitleId } = params

    // 都道府県or市区町村
    const govType = computed((): string => {
      return code.match('000') ? 'prefecture' : 'city'
    })

    // provide
    provide(PageStateKey, usePageState())
    const pageState: PageStateType = inject(PageStateKey)
    pageState.setState(code, statField, menuTitleId)

    const menuItems = contents.list
      .find((f) => f.fieldId === statField)
      ?.menu[govType.value].map((d) => {
        return {
          label: d.menuTitle,
          path: `/${code}/${statField}/${d.menuId}`,
        }
      })

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType.value === 'prefecture') {
        return `lazy-cards-${menuTitleId}-prefecture`
      } else {
        return `lazy-cards-${menuTitleId}-city`
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
