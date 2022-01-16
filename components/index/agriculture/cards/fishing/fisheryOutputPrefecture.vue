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
      title: '漁業産出額',
      titleId: 'fishery-output',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3120', 'C312001', 'C312002'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3120',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C312001',
          name: '海面漁業産出額',
        },
        {
          id: 'cat01',
          code: 'C312002',
          name: '海面養殖業産出額',
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
