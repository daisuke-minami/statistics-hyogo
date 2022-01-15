import { computed, useRoute } from '@nuxtjs/composition-api'
// import { StateKey } from '@/composition/useState'
import contents from '~/assets/json/contentsSetting.json'

export const useContents = () => {
  // const State = inject(StateKey)
  // const { code, govType, statField } = State
  // // console.log({ code, govType, statField })

  // パスパラメータの取得
  const route = useRoute()
  const params = route.value.params
  const { govType, code, statField, menuId, cardId } = params

  // 統計分野リスト
  const getFieldList = computed(() => {
    return contents.list.map((d) => {
      return {
        fieldTitle: d.fieldTitle,
        fieldId: d.fieldId,
      }
    })
  })

  const getInitMenuTitles = computed(() => {
    return contents.list.map((d) => {
      return {
        statField: d.fieldId,
        prefecture: d.menu.prefecture[0].menuId,
        city: d.menu.city[0].menuId,
      }
    })
  })

  const menuList = computed(() => {
    return contents.list
      .find((f) => f.fieldId === statField)
      ?.menu[govType].map((d) => {
        return {
          label: d.menuTitle,
          id: d.menuId,
          path: `/${govType}/${code}/${statField}/${d.menuId}/`,
          card: d.card,
        }
      })
  })

  const cardItem = computed(() => {
    // console.log(menuId)
    return menuList.value
      .find((f) => f.id === menuId)
      .card.find((f) => f.cardId === cardId)
  })

  return {
    getFieldList,
    getInitMenuTitles,
    cardItem,
    menuList,
  }
}
