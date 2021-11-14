<template>
  <div>
    <static-card>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="cityCode"
            :items="innnerCityList"
            item-text="cityName"
            item-value="cityCode"
            hint="市区町村を選択"
            @change="changeCity"
          />
        </v-col>
      </v-row>
    </static-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapActions } from 'vuex'

export default Vue.extend({
  props: {
    cityList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cityCode: null,
    }
  },
  computed: {
    innnetCityList() {
      // console.log(this.cityList)
      return this.cityList
    },
  },
  watch: {},
  created() {
    // this.cityCode = this.getSelectedCityCode
  },
  methods: {},
})
</script>
