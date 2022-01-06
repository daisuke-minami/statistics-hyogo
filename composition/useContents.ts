import { computed, inject } from '@nuxtjs/composition-api'
import { PageStateKey } from '@/composition/pageState'
import contents from '~/assets/json/contentsSetting.json'

export const useContents = () => {
  const pageState = inject(PageStateKey)
  const { code, govType, statField } = pageState
  // console.log({ code, govType, statField })
  // 統計分野リスト
  const test = computed(() => {
    return contents
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
    test,
    menuList,
  }
}
