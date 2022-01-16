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
      title: '完全失業者数',
      titleId: 'unemployed',
      params: {
        statsDataId: '0000020206',
        cdCat01: ['F1107', 'F110701', 'F110702'],
      },
      series: [
        {
          id: 'cat01',
          code: 'F1107',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'F110701',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'F110702',
          name: '女性',
        },
      ],
      annotation: [
        '非労働力人口:15歳以上の人口のうち，「就業者」と「完全失業者」以外の者',
      ],
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
