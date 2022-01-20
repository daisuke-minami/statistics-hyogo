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
    // Chartコンポーネントの設定
    const cardComponent = 'estat-column-line-card-multi'

    // State
    const estatState = reactive<EstatState>({
      title: '消防団数',
      titleId: 'fire-brigade',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K1104', 'K110401', 'K110402', 'K1105'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K1104',
          name: '総数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'K110401',
          name: '消防団数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'K110402',
          name: '消防分団数',
          type: 'column',
          yAxis: 0,
        },
        {
          id: 'cat01',
          code: 'K1105',
          name: '消防団員数',
          type: 'line',
          yAxis: 1,
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
