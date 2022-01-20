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
      title: '任意自動車保険普及率',
      titleId: 'voluntary-car-insurance-penetration-rate',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K330501', 'K330502', 'K330503', 'K330504'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K330501',
          name: '車両',
        },
        {
          id: 'cat01',
          code: 'K330502',
          name: '対人',
        },
        {
          id: 'cat01',
          code: 'K330503',
          name: '対物',
        },
        {
          id: 'cat01',
          code: 'K330504',
          name: '搭乗者傷害',
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
