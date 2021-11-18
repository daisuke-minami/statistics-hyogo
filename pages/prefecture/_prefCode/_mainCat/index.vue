<template>
  <div>
    <select-city />
    <tab-chart-class :statistics-class="statField" />

    <div :loading="$fetchState.pending">
      <p v-if="$fetchState.pending" />
      <card-row v-else class="DataBlock">
        <lazy-component
          :is="item.cardComponent"
          v-for="(item, i) in contentsList"
          :key="i"
          :series="item.series"
          :estat-params="item.estatParams"
          :annotation="item.annotation"
          :routing-path="item.routingPath"
          :title="item.title"
          :title-id="item.titleId"
          :selected-pref="selectedPref"
          :selected-city="selectedCity"
          :government-type="governmentType"
        />
      </card-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useFetch,
  useMeta,
  useStore,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const chartClass = ref<string>('prefecture')
    const governmentType = ref<string>('prefecture')

    const statField = computed((): string => {
      return route.value.params.statField
    })

    const contentsAll = ref({})
    useFetch(async () => {
      const data = await import(
        `~/static/pagesetting/${route.value.params.statField}.json`
      )
      contentsAll.value = data
    })

    const contentsList = computed((): object => {
      return contentsAll.value[governmentType.value].map((d) => {
        return {
          title: `${selectedPref.value.prefName}の${d.title}`,
          titleId: d.titleId,
          cardComponent: d.cardComponent,
          annotation: d.annotation,
          estatParams: d.estatParams,
          series: d.series,
          routingPath: `/${chartClass.value}/${selectedPref.value.prefCode}/${statField.value}/${d.titleId}/`,
        }
      })
    })

    // 都道府県／市区町村の情報
    const selectedPref = computed(
      () => store.getters['prefList/getSelectedPref']
    )
    const selectedCity = ref<object>({})

    // メタ
    const metaTitle = computed(() => {
      return `${selectedPref.value.prefName}の${statField.value}`
    })
    useMeta(() => ({
      title: metaTitle.value,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `統計`,
        },
      ],
    }))

    return {
      contentsList,
      statField,
      selectedPref,
      selectedCity,
      governmentType,
    }
  },
})
</script>

<style lang="scss" scoped>
.DataBlock {
  margin: 20px -8px;

  .DataCard {
    @include largerThan($medium) {
      padding: 10px;
    }

    @include lessThan($small) {
      padding: 4px 8px;
    }
  }
}
.loader {
  height: 200px;
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  img {
    display: block;
    margin: 0 auto 20px;
  }
}

.v-slide-group__content {
  border-bottom: 1px solid $gray-2;
  background: $gray-5;
}

.v-tab {
  top: 1px;
  margin: 0 8px;
  border-style: solid;
  border-radius: 4px 4px 0 0;
  font-weight: bold !important;
  @include font-size(16, true);

  &:focus {
    outline: dotted $gray-3 1px;
  }

  &--active {
    color: $gray-2 !important;
    background: $gray-5;
    border-color: $gray-2 $gray-2 $gray-5 $gray-2;
    border-width: 1px 1px 2px 1px;
    &::before {
      background-color: transparent;
    }
  }

  &:not(.v-tab--active) {
    color: $blue-1 !important;
    background: $white;
    border-color: $blue-1 $blue-1 $gray-2 $blue-1;
    border-width: 1px;
    &:hover {
      color: $white !important;
      background: $blue-1;
    }
    .TabIcon {
      color: inherit !important;
    }
  }
}

.v-tabs-items {
  background-color: transparent !important;
}

@function px2vw($px, $vw: 768) {
  @return $px / $vw * 100vw;
}

@include lessThan($medium) {
  .v-slide-group__content {
    width: 100%;
  }
  .v-tab {
    font-size: px2vw(16) !important;
    font-weight: normal !important;
    flex: 1 1 auto;
    width: 100%;
    padding: 0 8px !important;
  }
}

@include lessThan($small) {
  .v-tab {
    font-size: px2vw(20, 600) !important;
    padding: 0 4px !important;
  }
  .TabIcon {
    font-size: px2vw(24, 600) !important;
  }
}
</style>
