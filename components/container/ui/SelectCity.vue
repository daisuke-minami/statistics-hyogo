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

type Props = {
  cityList: [{ cityCode: string; cityName: string }]
}

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
      prefCode: '28',
      statisticsClass: 'landweather',
    }
  },
  computed: {
    ...mapGetters('cityList', ['getSelectedCityCode']),
  },
  watch: {},
  created() {
    // this.cityCode = this.getSelectedCityCode
  },
  methods: {
    ...mapActions('cityList', ['changeSelectedCity']),
    changeCity() {
      this.changeSelectedCity(this.cityCode)
      this.$router.push(
        `city/${this.prefCode}/${this.cityCode}/${this.statisticsClass}/`
      )
    },
  },
})
</script>
