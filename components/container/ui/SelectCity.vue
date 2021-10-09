<template>
  <div>
    <static-card>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="cityCode"
            :items="cityList"
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
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  props: {},
  data() {
    return {
      cityCode: null,
    }
  },
  computed: {
    ...mapGetters('cityList', ['getCityList', 'getSelectedCityCode']),
    cityList() {
      return this.getCityList
    },
  },
  watch: {},
  created() {
    this.cityCode = this.getSelectedCityCode
  },
  methods: {
    ...mapActions('cityList', ['changeSelectedCity']),
    changeCity() {
      this.changeSelectedCity(this.cityCode)
    },
  },
})
</script>
