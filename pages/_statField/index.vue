<template>
  <div>
    <select-city :stat-field="statField" />
    <!-- <tab-chart-class :statistics-class="statField" /> -->

    <!-- <div :loading="$fetchState.pending">
      <p v-if="$fetchState.pending" />
      <card-row v-else class="DataBlock">
        <lazy-component
          :is="item.cardComponent"
          v-for="(item, i) in contentsList"
          :key="i"
          :series="item.series"
          :estat-params="item.estatParams"
          :annotation="item.annotation"
          :routing-path="item.routingPath"
          :title="item.title"
          :title-id="item.titleId"
          :selected-pref="selectedPref"
          :selected-city="selectedCity"
          :government-type="governmentType"
        />
      </card-row>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'

type Computed = {
  statField: () => string
}

export default defineComponent<Computed>({
  setup() {
    // パスパラメータから統計分野(statField）を取得
    const route = useRoute()
    const statField = computed((): string => {
      return route.value.params.statField
    })

    return {
      statField,
    }
  },
})
</script>
