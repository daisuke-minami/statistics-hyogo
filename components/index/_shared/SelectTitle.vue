<template>
  <div>
    <static-card>
      <v-row>
        <v-col class="d-flex" cols="12" sm="12">
          <v-row align="center" justify="space-around">
            <v-btn text> Normal </v-btn>
            <v-btn text> Primary </v-btn>
            <v-btn text> Error </v-btn>
            <v-btn text> Normal </v-btn>
            <v-btn text> Primary </v-btn>
            <v-btn text> Error </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </static-card>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      titleId: '',
    }
  },
})
</script>
