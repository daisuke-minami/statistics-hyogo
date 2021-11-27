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
  provide,
  inject,
} from '@nuxtjs/composition-api'
import {
  useGovernmentState,
  GovernmentStateKey,
} from '@/composition/government'
import { useContentsState, ContentsStateKey } from '@/composition/contents'
import { useCardState, CardStateKey } from '@/composition/card'

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

    // 都道府県or市区町村
    const govType = computed((): string => {
      return code.value.match('000') ? 'prefecture' : 'city'
    })

    // provide(governmentState)
    provide(GovernmentStateKey, useGovernmentState())
    const govState: any = inject(GovernmentStateKey)
    govState.setGovType(code.value)
    govState.setSelectedPref(code.value)
    govState.setCityList(code.value)

    // provide(contentsState)
    provide(ContentsStateKey, useContentsState())
    const contentsState: any = inject(ContentsStateKey)
    const contentsList = contentsState.getContentsList(
      statField.value,
      govType.value
    )

    const title: string = contentsList.find(
      (f) => f.titleId === titleId.value
    ).title

    // provide(cardsState)
    provide(CardStateKey, useCardState())
    const cardState: any = inject(CardStateKey)
    cardState.setTitle(title)
    cardState.setTitleId(titleId.value)
    cardState.setRoutingPath(
      `/${code.value}/${statField.value}/${titleId.value}`
    )

    const contents = computed(() => {
      const c = contentsList.find((f) => f.titleId === titleId.value)
      return {
        title: c.title,
        titleId: c.titleId,
        annotation: c.annotation,
        routingPath: `/${code.value}/${statField.value}/${titleId.value}`,
      }
    })

    // タイトル一覧を設定
    const titleItems = contentsList.map((d) => {
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
