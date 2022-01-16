<template>
  <data-view :title="title" :route="path">
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
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useEstatTimeChart } from '@/composition/useEstatTimeChart'

export default defineComponent({
  props: {
    estatState: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // canvas
    const canvas = true

    const {
      title,
      titleId,
      path,
      lastUpdate,
      chartData,
      tableHeader,
      tableData,
      source,
      additionalDescription,
    } = useEstatTimeChart(props.estatState)

    // chartの種類を設定
    const chartComponent = 'column-chart'

    // 表示データの設定
    const displayData = computed(() => {
      return chartData.value
    })
    const displayInfo = computed(() => {
      const d: EstatSeries = chartData.value[0]
      const l: number = d.data.length
      return {
        lText: d.data[l - 1].y.toLocaleString(),
        sText: d.data[l - 1].x + '年の' + d.name,
        unit: d.data[l - 1].unit,
      }
    })

    return {
      title,
      titleId,
      path,
      lastUpdate,
      additionalDescription,
      source,
      tableHeader,
      tableData,
      canvas,
      displayInfo,
      displayData,
      chartComponent,
    }
  },
})
</script>
