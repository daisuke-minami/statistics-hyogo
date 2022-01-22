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
  ref,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { useEstatApi } from '@/composition/useEstatApi'
import { useGeojson } from '@/composition/useGeojson'
import { useCity } from '@/composition/useCity'

export default defineComponent({
  setup() {
    // Chartコンポーネントの設定
    const cardComponent = ref<string>('estat-city-rank-card')

    // State
    const estatState = reactive<EstatState>({
      title: '総人口ランキング',
      titleId: 'total-population-rank',
      params: {
        statsDataId: '0000020201',
        cdCat01: ['A1101', 'A110101', 'A110102'],
      },
      series: [
        {
          id: 'cat01',
          code: 'A1101',
          name: '総人口',
        },
        {
          id: 'cat01',
          code: 'A110101',
          name: '男性',
        },
        {
          id: 'cat01',
          code: 'A110102',
          name: '女性',
        },
      ],
      annotation: [],
      latestYear: {
        yearInt: 2015,
        yearStr: '2015100000',
        yearName: '2015年',
      },
      response: {},
    })

    // geoJson
    const cityMap = reactive<any>({})

    const { $axios } = useContext()
    const { fetch } = useFetch(async () => {
      // estat-APIの取得
      const params = Object.assign({}, estatState.params)
      const { cityList } = useCity()
      params.cdArea = cityList.value.map((d) => d.cityCode)
      estatState.response = await useEstatApi($axios, params).getData()

      // geojsonの取得
      cityMap.all = await useGeojson($axios).cityMapAll.value
      cityMap.break = await useGeojson($axios).cityMapBreak.value
    })
    fetch()

    return {
      cardComponent,
      props: {
        estatState,
        cityMap,
      },
    }
  },
})
</script>
