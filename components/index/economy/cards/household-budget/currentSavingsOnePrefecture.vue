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
      title: '貯蓄現在高（二人以上の世帯）',
      titleId: 'current-savings-one',
      params: {
        statsDataId: '0000010112',
        cdCat01: ['L430101', 'L430102', 'L430103', 'L430104'],
      },
      series: [
        {
          id: 'cat01',
          code: 'L430101',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'L430102',
          name: '預貯金',
        },
        {
          id: 'cat01',
          code: 'L430103',
          name: '生命保険など',
        },
        {
          id: 'cat01',
          code: 'L430104',
          name: '有価証券',
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
