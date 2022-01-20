<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <lazy-component :is="cardComponent" v-else v-bind="props" />
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useFetch,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { useEstatApi } from '@/composition/useEstatApi'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-line-card'

    // State
    const estatState = reactive<EstatState>({
      title: '運転免許保有者数',
      titleId: 'drivers-license',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K3501', 'K3502', 'K3503'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K3501',
          name: '運転免許保有者数（大型）',
        },
        {
          id: 'cat01',
          code: 'K3502',
          name: '運転免許保有者数（中型）',
        },
        {
          id: 'cat01',
          code: 'K3503',
          name: '運転免許保有者数（普通）',
        },
      ],
      annotation: [],
      response: {},
    })

    // routeパラメータの取得
    const { code } = useRoute().value.params

    // eStat-APIからデータを取得
    const { $axios } = useContext()
    const { fetch } = useFetch(async () => {
      const params = Object.assign({}, estatState.params)
      params.cdArea = code
      estatState.response = await useEstatApi($axios, params).getData()
    })
    fetch()

    return {
      cardComponent,
      props: {
        estatState,
      },
    }
  },
})
</script>
