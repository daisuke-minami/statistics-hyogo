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
      title: '従業者数',
      titleId: 'employees',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C2201', 'C2206', 'C2204', 'C2205'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C2201',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'C2206',
          name: '第１次産業',
        },
        {
          id: 'cat01',
          code: 'C2204',
          name: '第２次産業',
        },
        {
          id: 'cat01',
          code: 'C2205',
          name: '第３次産業',
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
