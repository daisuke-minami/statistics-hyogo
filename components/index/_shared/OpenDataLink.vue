<template>
  <app-link :to="url"> 地域経済分析システムRESAS </app-link>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    url: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss">
.OpenDataLink {
  text-decoration: none;
  .ExternalLinkIcon {
    vertical-align: text-bottom;
  }
}
</style>
