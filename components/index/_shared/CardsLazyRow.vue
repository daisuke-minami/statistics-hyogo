<template>
  <div class="DataBlock">
    <v-lazy
      v-for="(row, i) in rows"
      :key="i"
      v-intersect="handler"
      v-scroll="onScroll"
      :value="actives[i]"
      :options="{ threshold: 0 }"
      min-height="600"
      min-width="50%"
    >
      <card-row v-if="actives[i]">
        <component
          :is="component"
          v-for="(component, j) in row"
          :key="j"
          :series="series"
          :estat-params="estatParams"
          :routing-path="routingPath"
          :selected-pref="selectedPref"
          :selected-city="selectedCity"
          :gov-type="govType"
          :title="title"
          :title-id="titleId"
          :annotation="annotation"
          :latest-year-int="latestYearInt"
        />
      </card-row>
    </v-lazy>
  </div>
</template>

<script lang="ts">
import { mdiChevronRight } from '@mdi/js'
import Vue from 'vue'

import CardRow from '@/components/index/_shared/CardRow.vue'
// import { component } from 'vue/types/umd'

type Data = {
  actives: boolean[]
  scroll: boolean
  mdiChevronRight: string
}
type Methods = {
  handler: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
  ) => void
  onScroll: () => void
}
type Computed = {}
type Props = {
  rows: Vue[][]
  series: []
  estatParams: Object
  routingPath: String
  selectedPref: Object
  selectedCity: Object
  govType: String
  title: String
  titleId: String
  annotation: []
}
export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    CardRow,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
    estatParams: {
      type: Object,
      required: true,
    },
    routingPath: {
      type: String,
      required: true,
    },
    selectedPref: {
      type: Object,
      required: true,
    },
    selectedCity: {
      type: Object,
      required: true,
    },
    govType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleId: {
      type: String,
      required: true,
    },
    annotation: {
      type: Array,
      required: true,
    },
    latestYearInt: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      actives: Array.from({ length: this.rows.length }, () => false),
      scroll: false,
      mdiChevronRight,
    }
  },
  methods: {
    handler(_entries, _observer, isIntersecting) {
      if (!isIntersecting) return
      this.$set(this.actives, this.actives.indexOf(false), true)
    },
    onScroll() {
      if (this.scroll) return
      this.scroll = true
      this.$set(this.actives, 0, true)
      this.$set(this.actives, 1, true)
    },
  },
})
</script>

<style lang="scss" scoped>
.DataBlock {
  margin-top: 20px;

  .DataCard {
    margin: 8px 0;
  }
}

.expansion-panel-text {
  color: $gray-1;

  @include font-size(16);
}
</style>
