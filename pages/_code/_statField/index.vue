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
  // useFetch,
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
// import { mdiMenuDown } from '@mdi/js'

interface Menu {
  landweather: StatField
  population: StatField
  agriculture: StatField
  miningindustry: StatField
  commercial: StatField
  economy: StatField
  construction: StatField
  tourism: StatField
  educationsports: StatField
  administrativefinancial: StatField
  international: StatField
}

interface StatField {
  prefecture?: MenuItems[]
  city?: MenuItems[]
}

interface MenuItems {
  menuTitle: string
  menuTitleId: string
}

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { code, statField } = params
    const titleId = computed((): string => {
      return 'total-population'
    })

    // useFetch(async () => {
    //   const res = await $axios.$get('/data/contents/menulist.json')
    //   console.log(res)
    //   // const menuList = () => {
    //   //   return import('~/data/contents/menulist.json')
    //   // }
    // })

    // // console.log(menuList())

    // provide
    provide(PageStateKey, usePageState())
    const pageState: PageStateType = inject(PageStateKey)
    pageState.setState(code, statField, titleId)

    // // 都道府県or市区町村
    const govType = computed(() => {
      return code.match('000') ? 'prefecture' : 'city'
    })

    const menuItems = computed(() => {
      return menuList[statField][govType.value].map((d) => {
        return {
          label: d.menuTitle,
          path: `/${code}/${statField}/${d.menuTitleId}`,
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
