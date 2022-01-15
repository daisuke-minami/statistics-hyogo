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
    const cardComponent = 'estat-column-card'

    // State
    const estatState = reactive<EstatState>({
      title: '自然環境保全地域面積',
      titleId: 'natural-environment-conservation-area',
      params: {
        statsDataId: '0000010102',
        cdCat01: ['B1108', 'B2105', 'B2104', 'B2103'],
      },
      series: [
        {
          id: 'cat01',
          code: 'B1108',
          name: '自然環境保全地域面積',
        },
        {
          id: 'cat01',
          code: 'B2105',
          name: '国定公園面積',
        },
        {
          id: 'cat01',
          code: 'B2104',
          name: '国立公園面積',
        },
        {
          id: 'cat01',
          code: 'B2103',
          name: '都道府県立自然公園面積',
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
