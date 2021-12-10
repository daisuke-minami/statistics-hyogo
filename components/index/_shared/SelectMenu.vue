<template>
  <div>
    <static-card>
      <v-row>
        <v-col class="d-flex" cols="12" sm="12">
          <v-row>
            <v-btn
              v-for="(item, i) in menuItems"
              :key="i"
              :to="{ path: item.path }"
              nuxt
              exact
              text
            >
              {{ item.label }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </static-card>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  setup() {},
})
</script>
