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
import { usePrefecture } from '@/composition/usePrefecture'
import { usePopulation } from '@/composition/usePopulation'
import { EstatState } from '~/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-prefecture-rank-card'

    // State
    const estatState = reactive<EstatState>({
      title: '総人口ランキング',
      titleId: 'total-population-rank',
      params: {
        statsDataId: '0000010101',
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
        yearInt: 2019,
        yearStr: '2019100000',
        yearName: '2019年',
      },
      response: {},
    })

    const prefMap = ref<any>({})
    // const totalPopulation = ref<any>({})
    const { $axios } = useContext()
    const { fetch } = useFetch(async () => {
      const params = Object.assign({}, estatState.params)
      const { prefList } = usePrefecture()
      params.cdArea = prefList.value.map(
        (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
      )
      estatState.response = await useEstatApi($axios, params).getData()
      prefMap.value = await useGeojson($axios).getData()
      const test = await usePopulation($axios).getPopulationPrefecture()
      console.log(test)
    })
    fetch()

    return {
      cardComponent,
      props: {
        estatState,
        prefMap,
      },
    }
  },
})
</script>
