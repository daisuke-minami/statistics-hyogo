<template>
  <div>
    <v-tabs dark background-color="teal darken-3" show-arrows>
      <v-tabs-slider color="teal lighten-3" />
      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :to="{ path: item.path }"
        nuxt
        exact
        @click="change"
      >
        {{ item.label }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from '@nuxtjs/composition-api'
import { PageStateKey, PageStateType } from '@/composition/pageState'
import { EventBus, TOGGLE_EVENT } from '@/utils/tab-event-bus'

type TabItem = {
  label: string
  path: string
}

export default defineComponent({
  props: {
    statField: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    function toFiveDigit(code: number): string {
      return ('0000000000' + code).slice(-2) + '000'
    }

    const pageState: PageStateType = inject(PageStateKey)
    const cityList = pageState.cityList.value
    const selectedPref = pageState.selectedPref.value
    // タブ項目を生成
    const items = computed((): TabItem[] => {
      return [
        {
          label: selectedPref.prefName,
          path: `/${toFiveDigit(selectedPref.prefCode)}/${props.statField}`,
        },
        ...cityList.map((d: City) => {
          return {
            label: d.cityName,
            path: `/${d.cityCode}/${props.statField}`,
          }
        }),
      ]
    })

    const change = (): void => {
      EventBus.$emit(TOGGLE_EVENT)
    }

    return {
      items,
      change,
    }
  },
})
</script>
