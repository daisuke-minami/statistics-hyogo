<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card :loading="$fetchState.pending">
          <p v-if="$fetchState.pending" />
          <data-view v-else :title="title" :route="route">
            <h4 :id="titleId" class="visually-hidden">
              {{ title }}
            </h4>

            <template v-slot:infoPanel>
              <data-view-data-set-panel :display-info="displayInfo" />
            </template>

            <lazy-component
              :is="chartComponent"
              v-show="canvas"
              :display-data="displayData"
            />

            <template v-slot:description>
              <p>最終更新日:{{ lastUpdate }}</p>
              <slot name="description" />
            </template>

            <template v-slot:additionalDescription>
              <span>（注）</span>
              <ul>
                <li v-for="item in additionalDescription" :key="item">
                  {{ item }}
                </li>
              </ul>
              <slot name="additionalDescription" />
            </template>

            <template v-slot:dataTable>
              <client-only>
                <data-view-table :headers="tableHeader" :items="tableData" />
              </client-only>
            </template>

            <template v-slot:footer>
              <app-link :to="source.estatUrl">
                {{ source.estatName }}
              </app-link>
            </template>
          </data-view>
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script lang="ts">
import {
  defineComponent,
  // reactive,
  computed,
  PropType,
} from '@nuxtjs/composition-api'
import { useEstatTimeChart } from '@/composition/useEstatTimeChart'
import { EstatParams, EstatSeries, EstatTimes, CardTitle } from '~/types/estat'

export default defineComponent({
  props: {
    cardTitle: {
      type: Object as PropType<CardTitle>,
      required: true,
    },
    estatParams: {
      type: Object as PropType<EstatParams>,
      required: true,
    },
    estatSeries: {
      type: Array as PropType<EstatSeries[]>,
      required: true,
    },
    estatLatestYear: {
      type: Object as PropType<EstatTimes>,
      required: true,
    },
    estatAnnotation: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const {
      canvas,
      title,
      titleId,
      route,
      lastUpdate,
      loading,
      chartData,
      tableHeader,
      tableData,
      source,
      additionalDescription,
      displayInfo,
    } = useEstatTimeChart(props)

    // chartの種類を設定
    const chartComponent = 'column-chart'

    const displayData = computed(() => {
      return chartData.value
    })

    return {
      title,
      titleId,
      route,
      lastUpdate,
      additionalDescription,
      source,
      tableHeader,
      tableData,
      canvas,
      loading,
      displayInfo,
      displayData,
      chartComponent,
    }
  },
})
</script>
