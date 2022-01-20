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
    const cardComponent = 'estat-column-line-card'

    // State
    const estatState = reactive<EstatState>({
      title: '温室効果ガス算定排出量',
      titleId: 'calculated-greenhouse-gas-emissions',
      params: {
        statsDataId: '0000010111',
        cdCat01: ['K6107', 'K6108'],
      },
      series: [
        {
          id: 'cat01',
          code: 'K6107',
          name: '温室効果ガス算定排出量',
          type: 'column',
          yAxis: 1,
        },
        {
          id: 'cat01',
          code: 'K6108',
          name: '温室効果ガス算定排出量（率）',
          type: 'line',
          yAxis: 0,
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
