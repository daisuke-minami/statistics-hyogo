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
            @change="$emit('input', $event)"
          />
        </v-col>
      </v-row>
    </static-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

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
      cityCode: '',
    }
  },
  computed: {
    ...mapGetters('cityList', ['getSelectedCityCode']),
  },
  created() {
    this.cityCode = this.getSelectedCityCode
  },
})
</script>
