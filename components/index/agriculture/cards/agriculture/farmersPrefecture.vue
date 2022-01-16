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
      title: '農家数',
      titleId: 'farmers',
      params: {
        statsDataId: '0000010103',
        cdCat01: ['C3102', 'C310202', 'C310211', 'C310212'],
      },
      series: [
        {
          id: 'cat01',
          code: 'C3102',
          name: '農家数',
        },
        {
          id: 'cat01',
          code: 'C310202',
          name: '自給的農家',
        },
        {
          id: 'cat01',
          code: 'C310211',
          name: '販売農家（専業農家）',
        },
        {
          id: 'cat01',
          code: 'C310212',
          name: '販売農家（兼業農家）',
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
