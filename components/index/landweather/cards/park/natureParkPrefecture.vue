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
      title: '自然公園面積',
      titleId: 'nature-park-area',
      params: {
        statsDataId: '0000010102',
        cdCat01: ['B2101', 'B2103', 'B2105', 'B2104'],
      },
      series: [
        {
          id: 'cat01',
          code: 'B2101',
          name: '自然公園面積',
        },
        {
          id: 'cat01',
          code: 'B2105',
          name: '国定公園面積',
        },
        {
          id: 'cat01',
          code: 'B2104',
          name: '国立公園面積',
        },
        {
          id: 'cat01',
          code: 'B2103',
          name: '都道府県立自然公園面積',
        },
      ],
      annotation: [
        '自然公園とは、優れた自然の風景地に区域を画して設けられる公園のことをいい、その風景地の内容や指定方法により「国立公園」、「国定公園」、「都道府県立自然公園」の3種類に区分される',
        '国立公園:日本の中で特に優れた自然の風景地であり、環境大臣が指定する',
        '国定公園:国立公園に準ずる優れた自然の風景地であり、都道府県の申し出を受けて環境大臣が指定する',
        '都道府県立自然公園:都道府県の風景を代表する傑出した自然の風景地であり、都道府県知事が指定する',
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
