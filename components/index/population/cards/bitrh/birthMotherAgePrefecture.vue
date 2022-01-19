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
    const cardComponent = 'estat-column-card-multi'

    // State
    const estatState = reactive<EstatState>({
      title: '出生数（母親の年齢別）',
      titleId: 'birth-mother-age',
      params: {
        statsDataId: '0000010101',
        cdCat01: [
          'A410201',
          'A410202',
          'A410203',
          'A410204',
          'A410205',
          'A410206',
          'A410207',
          'A410208',
          'A410209',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'A410201',
          name: '母親の年齢15歳未満',
        },
        {
          id: 'cat01',
          code: 'A410202',
          name: '母親の年齢15〜19歳',
        },
        {
          id: 'cat01',
          code: 'A410203',
          name: '母親の年齢20〜24歳',
        },
        {
          id: 'cat01',
          code: 'A410204',
          name: '母親の年齢25〜29歳',
        },
        {
          id: 'cat01',
          code: 'A410205',
          name: '母親の年齢30〜34歳',
        },
        {
          id: 'cat01',
          code: 'A410206',
          name: '母親の年齢35〜39歳',
        },
        {
          id: 'cat01',
          code: 'A410207',
          name: '母親の年齢40〜44歳',
        },
        {
          id: 'cat01',
          code: 'A410208',
          name: '母親の年齢45〜49歳',
        },
        {
          id: 'cat01',
          code: 'A410209',
          name: '母親の年齢50歳以上',
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
