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
      title: '就業者数',
      titleId: 'employees',
      params: {
        statsDataId: '0000020206',
        cdCat01: ['F1102', 'F110201', 'F110202'],
      },
      series: [
        {
          id: 'cat01',
          code: 'F1102',
          name: '総数',
        },
        {
          id: 'cat01',
          code: 'F110201',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'F110202',
          name: '女性',
        },
      ],
      annotation: [
        '就業者:「従業者」と「休業者」を合わせたもの',
        '従業者:調査週間中に賃金，給料，諸手当，内職収入などの収入を伴う仕事（以下「仕事」という。）を1時間以上した者。なお，家族従業者は，無給であっても仕事をしたとする。',
        '休業者:仕事を持ちながら，調査週間中に少しも仕事をしなかった者のうち、雇用者で，給料・賃金（休業手当を含む。）の支払を受けている者又は受けることになっている者、または自営業主で，自分の経営する事業を持ったままで，その仕事を休み始めてから30日にならない者',
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
