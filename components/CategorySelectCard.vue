<template>
  <div>
    <static-card>
      <v-row>
        <v-col>
          <v-select
            v-model="titleId"
            :items="contentsList"
            item-text="title"
            item-value="titleId"
            hint="統計項目を選択"
            persistent-hint
            @change="$emit('input', $event)"
          />
        </v-col>
        <v-col>
          <data-selector-rank-data-card v-model="rankDataType" />
        </v-col>
      </v-row>
    </static-card>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    contentsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rankDataType: 'all',
      categoryCode: '',
      canvas: true,
      row: null,
      titleId: '',
    }
  },
  computed: {
    // categoryList() {
    //   return this.chartList
    // },
  },
  created() {
    this.titleId = this.contentsList[0].titleId
  },
})
</script>
