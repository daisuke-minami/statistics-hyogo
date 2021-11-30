<template>
  <lazy-component :is="chartComponent" v-bind="props" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import {
  EstatParams,
  EstatSeries,
  EstatTimes,
} from '~/components/index/_shared/estat/type'

export default defineComponent({
  setup() {
    // Chartコンポーネントの設定
    const chartComponent = ref<string>('estat-column-card-single-multi')

    const cardTitle = computed((): string => {
      return `兵庫県の総人口`
    })
    const cardTitleId = computed((): string => {
      return `total-population`
    })
    const cardRoutingPath = computed((): string => {
      return `routingPath`
    })

    // computedでcdAreaをセットすべき
    const estatParams = reactive<EstatParams>({
      statsDataId: '0000010101',
      cdCat01: ['A1101', 'A110101', 'A110102'],
      cdArea: '28000',
    })
    const estatSeries = reactive<EstatSeries[]>([
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
    ])
    const estatLatestYear = reactive<EstatTimes>({
      yearInt: 2019,
      yearStr: '2019100000',
      yearName: '2019年',
    })
    const estatAnnotation = reactive<string[]>([])

    return {
      chartComponent,
      props: {
        cardTitle: cardTitle.value,
        cardTitleId: cardTitleId.value,
        cardRoutingPath: cardRoutingPath.value,
        estatParams,
        estatSeries,
        estatLatestYear,
        estatAnnotation,
      },
    }
  },
})
</script>
