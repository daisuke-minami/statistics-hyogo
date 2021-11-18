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
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'
import { EventBus, TOGGLE_EVENT } from '@/utils/tab-event-bus'
import { City } from '~/store/cityList'
import { Pref } from '~/store/prefList'

type Props = {
  statField: string
}

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
  setup(props: Props) {
    // ストアから都道府県と市区町村リストを取得
    const store = useStore()
    const { value: cityList } = computed(
      (): City[] => store.getters['cityList/getCityList']
    )
    const selectedPref = computed(
      (): Pref => store.getters['prefList/getSelectedPref']
    )

    function toFiveDigit(code: number): string {
      return ('0000000000' + code).slice(-2) + '000'
    }

    // タブ項目を生成
    const items = computed((): TabItem[] => {
      return [
        {
          label: selectedPref.value.prefName,
          path: `/${toFiveDigit(selectedPref.value.prefCode)}/${
            props.statField
          }`,
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
