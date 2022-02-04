<template>
  <div class="DataView-DataSet">
    <div class="DataView-DataSet-info">
      <template v-if="displayInfo.lText">
        <small class="DataView-DataSet-summary-unit">{{
          displayInfo.title
        }}</small>
        <span class="DataView-DataSet-summary">
          {{ displayInfo.lText }}
          <small class="DataView-DataSet-summary-unit">{{
            displayInfo.unit
          }}</small>
        </span>
        <br />
      </template>
      <small class="DataView-DataSet-date">{{ displayInfo.sText }}</small>
      <template v-if="displayInfo.sTextUnder">
        <br />
        <small class="DataView-DataSet-date">{{
          displayInfo.sTextUnder
        }}</small>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    displayInfo: {
      type: Object,
      required: true,
      // default: ,
    },
  },
})
</script>

<style lang="scss" scoped>
.DataView {
  &-DataSet {
    display: flex;
    flex-flow: column;
    margin-bottom: 10px;

    @include largerThan($large) {
      justify-content: space-between;
      flex-flow: row;
    }

    &-title {
      float: right;
      font-size: 2rem;
      flex: 1 1 50%;
      // margin-bottom: 10px;
    }

    &-info {
      flex: 1 1 50%;

      @include largerThan($large) {
        text-align: right;
      }
    }

    &-summary {
      display: inline-block;
      color: $gray-2;
      white-space: nowrap;
      font-family: Hiragino Sans, sans-serif;
      font-style: normal;
      line-height: 30px;
      @include font-size(30);

      &-unit {
        width: 100%;
        @include font-size(18);
      }
    }

    &-date {
      display: inline-block;
      width: 100%;
      color: $gray-3;
      line-height: initial;
      @include font-size(12);
    }
  }
}
</style>
