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
    // Chartコンポーネントの設定
    const cardComponent = 'estat-pyramid-card'

    // State
    const estatState = reactive<EstatState>({
      title: '未婚人口',
      titleId: 'unmarried',
      params: {
        statsDataId: '0000010101',
        cdCat01: [
          'A1601021',
          'A1601022',
          'A1601031',
          'A1601032',
          'A1601041',
          'A1601042',
          'A1601051',
          'A1601052',
          'A1601061',
          'A1601062',
          'A1601071',
          'A1601072',
          'A1601081',
          'A1601082',
          'A1601091',
          'A1601092',
          'A1601101',
          'A1601102',
          'A1601111',
          'A1601112',
          'A1601121',
          'A1601122',
          'A1601131',
          'A1601132',
          'A1601141',
          'A1601142',
          'A1601151',
          'A1601152',
        ],
      },
      series: [
        {
          id: 'cat01',
          name: '20～24歳',
          man: 'A1601021',
          woman: 'A1601022',
        },
        {
          id: 'cat01',
          name: '25～29歳',
          man: 'A1601031',
          woman: 'A1601032',
        },
        {
          id: 'cat01',
          name: '30～34歳',
          man: 'A1601041',
          woman: 'A1601042',
        },
        {
          id: 'cat01',
          name: '35～39歳',
          man: 'A1601051',
          woman: 'A1601052',
        },
        {
          id: 'cat01',
          name: '40～44歳',
          man: 'A1601061',
          woman: 'A1601062',
        },
        {
          id: 'cat01',
          name: '45～49歳',
          man: 'A1601071',
          woman: 'A1601072',
        },
        {
          id: 'cat01',
          name: '50～54歳',
          man: 'A1601081',
          woman: 'A1601082',
        },
        {
          id: 'cat01',
          name: '55～59歳',
          man: 'A1601091',
          woman: 'A1601092',
        },
        {
          id: 'cat01',
          name: '60～64歳',
          man: 'A1601101',
          woman: 'A1601102',
        },
        {
          id: 'cat01',
          name: '65～69歳',
          man: 'A1601111',
          woman: 'A1601112',
        },
        {
          id: 'cat01',
          name: '70～74歳',
          man: 'A1601121',
          woman: 'A1601122',
        },
        {
          id: 'cat01',
          name: '75～79歳',
          man: 'A1601131',
          woman: 'A1601132',
        },
        {
          id: 'cat01',
          name: '80～84歳',
          man: 'A1601141',
          woman: 'A1601142',
        },
        {
          id: 'cat01',
          name: '85歳以上',
          man: 'A1601151',
          woman: 'A1601152',
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
