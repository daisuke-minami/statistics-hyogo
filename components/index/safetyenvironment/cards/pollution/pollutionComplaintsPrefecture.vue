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
    const cardComponent = 'estat-column-card-all-break'

    // State
    const estatState = reactive<EstatState>({
      title: '公害苦情件数（典型7公害）',
      titleId: 'pollution-complaints',
      params: {
        statsDataId: '0000010111',
        cdCat01: [
          'K6103',
          'K610301',
          'K610302',
          'K610303',
          'K610304',
          'K610305',
          'K610306',
          'K610307',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'K6103',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'K610301',
          name: '大気汚染',
        },
        {
          id: 'cat01',
          code: 'K610302',
          name: '水質汚濁',
        },
        {
          id: 'cat01',
          code: 'K610303',
          name: '土壌汚染',
        },
        {
          id: 'cat01',
          code: 'K610304',
          name: '騒音',
        },
        {
          id: 'cat01',
          code: 'K610305',
          name: '振動',
        },
        {
          id: 'cat01',
          code: 'K610306',
          name: '地盤沈下',
        },
        {
          id: 'cat01',
          code: 'K610307',
          name: '悪臭',
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
