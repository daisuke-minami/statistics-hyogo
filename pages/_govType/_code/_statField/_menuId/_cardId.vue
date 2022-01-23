<template>
  <div>
    <component :is="cardComponent" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  useMeta,
  inject,
  reactive,
} from '@nuxtjs/composition-api'
import { StateKey } from '@/composition/useGlobalState'
import { useContents } from '~/composition/useContents'

export default defineComponent({
  head: {},
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const params = route.value.params
    const { govType, code, statField, menuId, cardId } = params

    // Stateをセット
    const State = inject(StateKey)
    State.setState(govType, code)

    // カードコンポーネントの設定
    const cardComponent = computed((): string => {
      if (govType === 'prefecture') {
        return `lazy-${cardId}-prefecture`
      } else {
        return `lazy-${cardId}-city`
      }
    })

    // メタ
    const url = 'https://statistics-hyogo.com'
    const ogpImage = computed(() => {
      return `${url}/ogp/_${govType}_${code}_${statField}_${menuId}_${cardId}_.png`
    })
    const { getCardTitle } = useContents()
    const ogpTitle = computed(() => {
      return `${getCardTitle.value(cardId)} | 統計で見る兵庫県のすがた`
    })

    const mInfo = reactive<any>([
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${url}/${govType}/${code}/${statField}/${menuId}/${cardId}`,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: ogpTitle.value,
      },
      {
        hid: 'description',
        name: 'description',
        content: `当サイトは、兵庫県に関する統計をわかりやすく伝えることを目的として、いち兵庫県民が開設したサイトです。`,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: `当サイトは、兵庫県に関する統計をわかりやすく伝えることを目的として、いち兵庫県民が開設したサイトです。`,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ogpImage.value,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: ogpImage.value,
      },
    ])

    const { title, meta } = useMeta()
    title.value = ogpTitle.value
    meta.value = mInfo

    // console.log({ title, meta })
    return {
      statField,
      cardComponent,
    }
  },
})
</script>
