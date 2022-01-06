import { computed, inject } from '@nuxtjs/composition-api'
import { PageStateKey } from '@/composition/pageState'
import contents from '~/assets/json/contentsSetting.json'

export const useContents = () => {
  const pageState = inject(PageStateKey)
  const { code, govType, statField } = pageState
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
    menuList,
  }
}
