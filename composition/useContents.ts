import { computed, inject, useRoute } from '@nuxtjs/composition-api'
import { StateKey } from './useGlobalState'
import contents from '~/assets/json/contentsSetting.json'

interface Field {
  fieldTitle: string
  fieldId: string
}

interface Menu {
  menuTitle: string
  menuId: string
}

interface State {
  fieldList: Field[]
  menuList: Menu[]
}

// Menuの初期値リスト
const initMenuList = () => {
  return contents.list.map((d) => {
    return {
      statField: d.fieldId,
      prefecture: d.menu.prefecture[0].menuId,
      city: d.menu.city[0].menuId,
    }
  })
}

export const useContents = () => {
  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { govType, code, statField, menuId } = params

  // 統計分野リスト
  const fieldList = computed(() => {
    return contents.list.map((d) => {
      return {
        fieldTitle: d.fieldTitle,
        fieldId: d.fieldId,
      }
    })
  })

  // 統計項目リスト
  const menuList = computed(() => {
    const menu = contents.list.filter((f) => f.fieldId === statField)[0].menu
    if (govType === 'prefecture') {
      return menu.prefecture
    } else {
      return menu.city
    }
  })

  // 統計項目リンク SelectMenuで使用
  const menuLinks = computed(() => {
    return menuList.value.map((d) => {
      return {
        label: d.menuTitle,
        path: `/${govType}/${code}/${statField}/${d.menuId}/`,
      }
    })
  })

  const getInitMenuId = computed(() => {
    return function (statField: string) {
      return initMenuList().find((f) => f.statField === statField)
    }
  })

  // カードリスト
  const cardList = computed(() => {
    return menuList.value.filter((f) => f.menuId === menuId)[0].card
  })

  // 都道府県・市区町村
  const State = inject(StateKey)
  const { currentPref, currentCity } = State

  // MenuTitleの取得
  const getMenuTitle = computed(() => {
    return function (menuId: string) {
      const title = menuList.value.filter((f) => f.menuId === menuId)[0]
        .menuTitle
      return govType === 'prefecture'
        ? `${currentPref.value.prefName}の${title}`
        : `${currentCity.cityName}の${title}`
    }
  })

  // CardTitleの取得
  const getCardTitle = computed(() => {
    return function (cardId: string) {
      const title = cardList.value.filter((f) => f.cardId === cardId)[0]
        .cardTitle
      return govType === 'prefecture'
        ? `${currentPref.value.prefName}の${title}`
        : `${currentCity.cityName}の${title}`
    }
  })

  return {
    // ...toRefs(state),
    fieldList,
    menuList,
    // getInitMenuTitles,
    cardList,
    getCardTitle,
    getMenuTitle,
    getInitMenuId,
    menuLinks,
  }
}
