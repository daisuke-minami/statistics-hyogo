<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <lazy-component :is="cardComponent" v-bind="props" />
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
    const cardComponent = 'estat-pyramid-card'

    // State
    const estatState = reactive<EstatState>({
      title: '離別人口',
      titleId: 'separated',
      params: {
        statsDataId: '0000010101',
        cdCat01: [
          'A1604031',
          'A1604032',
          'A1604041',
          'A1604042',
          'A1604051',
          'A1604052',
          'A1604061',
          'A1604062',
          'A1604071',
          'A1604072',
          'A1604081',
          'A1604082',
          'A1604091',
          'A1604092',
          'A1604101',
          'A1604102',
          'A1604111',
          'A1604112',
          'A1604121',
          'A1604122',
          'A1604131',
          'A1604132',
          'A1604141',
          'A1604142',
          'A1604151',
          'A1604152',
        ],
      },
      series: [
        {
          name: '20～24歳',
          man: 'A1604021',
          woman: 'A1604022',
        },
        {
          name: '25～29歳',
          man: 'A1604031',
          woman: 'A1604032',
        },
        {
          name: '30～34歳',
          man: 'A1604041',
          woman: 'A1604042',
        },
        {
          name: '35～39歳',
          man: 'A1604051',
          woman: 'A1604052',
        },
        {
          name: '40～44歳',
          man: 'A1604061',
          woman: 'A1604062',
        },
        {
          name: '45～49歳',
          man: 'A1604071',
          woman: 'A1604072',
        },
        {
          name: '50～54歳',
          man: 'A1604081',
          woman: 'A1604082',
        },
        {
          name: '55～59歳',
          man: 'A1604091',
          woman: 'A1604092',
        },
        {
          name: '60～64歳',
          man: 'A1604101',
          woman: 'A1604102',
        },
        {
          name: '65～69歳',
          man: 'A1604111',
          woman: 'A1604112',
        },
        {
          name: '70～74歳',
          man: 'A1604121',
          woman: 'A1604122',
        },
        {
          name: '75～79歳',
          man: 'A1604131',
          woman: 'A1604132',
        },
        {
          name: '80～84歳',
          man: 'A1604141',
          woman: 'A1604142',
        },
        {
          name: '85歳以上',
          man: 'A1604151',
          woman: 'A1604152',
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
