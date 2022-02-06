<template>
  <lazy-component :is="cardComponent" v-bind="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { EstatState } from '@/types/estat'

export default defineComponent({
  setup() {
    // cardコンポーネントの設定
    const cardComponent = 'estat-column-card-multi'

    // State
    const estatState: EstatState = {
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
    }

    return {
      cardComponent,
      props: {
        estatState,
      },
    }
  },
})
</script>
