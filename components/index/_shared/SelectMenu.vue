<template>
  <div>
    <static-card>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="{ path: item.path }"
        nuxt
        exact
        text
      >
        {{ item.label }}
      </v-btn>
    </static-card>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useContents } from '@/composition/useContents'

export default defineComponent({
  setup() {
    const items = useContents().menuList.value
    return { items }
  },
})
</script>
