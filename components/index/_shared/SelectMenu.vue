<template>
  <div>
    <static-card>
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
    </static-card>
  </div>
</template>

<script>
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { PageStateKey } from '@/composition/pageState'
import contents from '~/data/contents/contents.json'

export default defineComponent({
  setup() {
    const pageState = inject(PageStateKey)
    const { code, govType, statField } = pageState

    const menuItems = contents.list
      .find((f) => f.fieldId === statField.value)
      ?.menu[govType.value].map((d) => {
        return {
          label: d.menuTitle,
          path: `/${code.value}/${statField.value}/${d.menuId}/`,
        }
      })
    return { menuItems }
  },
})
</script>
