import { computed, inject } from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useState'
import contents from '~/assets/json/contentsSetting.json'

export const useContents = () => {
  const State = inject(StateKey)
  const { code, govType, statField } = State
  // console.log({ code, govType, statField })

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
      .find((f) => f.fieldId === statField.value)
      ?.menu[govType.value].map((d) => {
        return {
          label: d.menuTitle,
          path: `/${govType.value}/${code.value}/${statField.value}/${d.menuId}/`,
        }
      })
  })

  return {
    getFieldList,
    getInitMenuTitles,
    menuList,
  }
}
