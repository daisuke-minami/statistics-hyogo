<template>
  <data-view :title="title" :title-id="titleId" :date="date">
    <v-data-table
      :ref="'displayedTable'"
      :headers="headers"
      :items="items"
      :items-per-page="-1"
      :hide-default-footer="true"
      :height="240"
      :fixed-header="true"
      :mobile-breakpoint="0"
      :disable-sort="true"
      class="cardTable"
    />
    <template v-slot:additionalDescription>
      <slot name="additionalDescription" />
    </template>
  </data-view>
</template>

<script lang="ts">
import Vue from 'vue'

// import DataView from '@/components/DataView.vue'

export default Vue.extend({
  // components: { DataView },
  props: {
    title: {
      type: String,
      default: '',
    },
    titleId: {
      type: String,
      default: '',
    },
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    date: {
      type: String,
      default: '',
    },
  },
  mounted() {
    const vTables = this.$refs.displayedTable as Vue
    const vTableElement = vTables.$el
    const tables = vTableElement.querySelectorAll('table')
    // NodeListをIE11でforEachするためのワークアラウンド
    const nodes = Array.prototype.slice.call(tables, 0)
    nodes.forEach((table: HTMLElement) => {
      table.setAttribute('tabindex', '0')
    })
  },
})
</script>
