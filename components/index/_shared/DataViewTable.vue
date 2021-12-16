<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="-1"
    :hide-default-footer="true"
    :height="240"
    :fixed-header="true"
    :disable-sort="true"
    :mobile-breakpoint="0"
    class="cardTable"
  />
</template>

<script>
// import Vue from 'vue'

export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    // headerKey: {
    //   type: String,
    //   default: 'text',
    // },
  },
  // computed: {
  //   dataKeys() {
  //     return this.headers
  //       .map((h) => h.value)
  //       .filter((h) => h !== this.headerKey)
  //   },
  // },
  mounted() {},
}
</script>

<style lang="scss">
.cardTable-header {
  white-space: nowrap !important;
}
.v-data-table .text-end {
  text-align: right;
}
</style>
