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
import {
  // useGovernmentState,
  GovernmentStateKey,
} from '@/composition/government'
import { EventBus, TOGGLE_EVENT } from '@/utils/tab-event-bus'
// import { City } from '~/store/cityList'
// import { Pref } from '~/store/prefList'

// type Props = {
//   statField: string
// }

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

    const state = inject(GovernmentStateKey)
    const cityList = state.cityList
    const selectedPref = state.selectedPref
    // タブ項目を生成
    const items = computed((): TabItem[] => {
      return [
        {
          label: selectedPref.value.prefName,
          path: `/${toFiveDigit(selectedPref.value.prefCode)}/${
            props.statField
          }`,
        },
        ...cityList.value.map((d: City) => {
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
