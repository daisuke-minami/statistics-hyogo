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
      title: '消費支出（二人以上の世帯）',
      titleId: 'consumption-expenditure-one',
      params: {
        statsDataId: '0000010112',
        cdCat01: [
          'L3221',
          'L322101',
          'L322102',
          'L322103',
          'L322104',
          'L322105',
          'L322106',
          'L322107',
          'L322108',
          'L322109',
          'L322110',
        ],
      },
      series: [
        {
          id: 'cat01',
          code: 'L3221',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'L322101',
          name: '食糧費',
        },
        {
          id: 'cat01',
          code: 'L322102',
          name: '住居費',
        },
        {
          id: 'cat01',
          code: 'L322103',
          name: '光熱・水道費',
        },
        {
          id: 'cat01',
          code: 'L322104',
          name: '家具・家事用品費',
        },
        {
          id: 'cat01',
          code: 'L322105',
          name: '被服及び履物費',
        },
        {
          id: 'cat01',
          code: 'L322106',
          name: '保険医療費',
        },
        {
          id: 'cat01',
          code: 'L322107',
          name: '交通・通信費',
        },
        {
          id: 'cat01',
          code: 'L322108',
          name: '教育費',
        },
        {
          id: 'cat01',
          code: 'L322109',
          name: '教養娯楽費',
        },
        {
          id: 'cat01',
          code: 'L322110',
          name: 'その他',
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
