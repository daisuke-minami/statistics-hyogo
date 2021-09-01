<template>
  <div>
    <card-row class="DataBlock">
      <!-- 県民局 -->
      <hyogo-kenmin-kyoku-card />
      <!-- 市区町村合併 -->
      <hyogo-city-card :pref-code="prefCode" :pref-name="prefName" />
    </card-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('prefList', ['getSelectedPrefCode', 'getPrefName']),
    prefCode() {
      return this.getSelectedPrefCode
    },
    prefName() {
      return this.getPrefName(this.prefCode)
    },
  },
})
</script>

<style lang="scss" scoped>
.DataBlock {
  margin: 20px -8px;

  .DataCard {
    @include largerThan($medium) {
      padding: 10px;
    }

    @include lessThan($small) {
      padding: 4px 8px;
    }
  }
}
</style>
