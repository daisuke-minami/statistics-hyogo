<template>
  <div>
    <static-card>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="titleId"
            :items="contentsList"
            item-text="title"
            item-value="titleId"
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
  },
  data() {
    return {
      categoryCode: '',
      canvas: true,
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
