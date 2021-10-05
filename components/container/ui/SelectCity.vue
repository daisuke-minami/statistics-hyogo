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
            @change="jumpToCityPage"
          />
        </v-col>
      </v-row>
    </static-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

type Props = {
  cityList: [{ cityCode: string; cityName: string }]
}

export default Vue.extend({
  props: {
    cityList: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cityCode: null,
    }
  },
  computed: {
    ...mapGetters('cityList', ['getSelectedCityCode']),
  },
  watch: {
    cityCode() {
      this.$store.dispatch('cityList/changeSelectedCity', {
        newCity: this.cityCode,
      })
      // $store.dispatch('cityList/changeSelectedCity')Ï
    },
  },
  created() {
    // console.log(this.path)
    this.cityCode = this.getSelectedCityCode
  },
  methods: {
    ...mapActions('cityList', ['changeSelectedCity']),
    jumpToCityPage() {
      // console.log(this.cityCode)
      this.changeSelectedCity(this.cityCode)
      this.$router.push(`${this.path}/${this.cityCode}`)
    },
    // ...mapActions({
    //   cityCode: 'changeSelectedCity',
    // }),
  },
})
</script>
