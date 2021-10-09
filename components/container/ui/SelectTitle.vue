<template>
  <div>
    <static-card>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="titleId"
            :items="items"
            item-text="title"
            item-value="titleId"
            hint="統計項目を選択"
            persistent-hint
            @change="$emit('input', $event)"
          />
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
    // isRank: {
    //   type: Boolean,
    //   required: true,
    // },
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
    items() {
      return this.contentsList
      // if (this.isRank) {
      //   // RankChartの対象のみ抽出
      //   return this.contentsList.filter((f) => f.isRank === true)
      // } else {
      //   return this.contentsList
      // }
    },
  },
  created() {
    this.titleId = this.items[0].titleId
  },
})
</script>
