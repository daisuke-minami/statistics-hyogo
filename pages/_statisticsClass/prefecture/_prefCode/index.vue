<template>
  <div>
    <tab-chart-class :statistics-class="statisticsClass" />
    <card-row class="DataBlock">
      <component
        :is="item.cardComponent"
        v-for="(item, i) in contentsList"
        :key="i"
        :contents="item.contents"
      />
    </card-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { EventBus, TOGGLE_EVENT } from '@/utils/tab-event-bus.ts'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { mapGetters } from 'vuex'
// import { cloneDeep } from 'lodash'
import { ContentsType, ContentsList } from '~/utils/formatChart'

type Props = {
  statisticsClass: string
  contentsAll: ContentsType[]
}

type Computed = {
  prefInfomation: () => { prefName: string; prefCode: string }
  contentsList: () => ContentsList[]
}

type Methods = {}

const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  async asyncData({ params }) {
    const contentsAll = await import(
      `~/static/pagesetting/${params.statisticsClass}.json`
    )
    return { contentsAll }
  },
  data() {
    return {
      governmentType: 'prefecture',
      tab: null,
    }
  },
  computed: {
    ...mapGetters('prefList', ['getSelectedPrefCode', 'getPrefName']),
    prefCode() {
      return this.getSelectedPrefCode
    },
    prefName() {
      return this.getPrefName(this.prefCode)
    },
    statisticsClass() {
      return this.$route.params.statisticsClass
    },
    items() {
      return [
        { label: `${this.prefName}の統計`, component: 'cards-pref' },
        { label: '市区町村の統計', component: 'cards-city' },
        { label: '都道府県ランキング', component: 'cards-pref-rank' },
        { label: '市区町村ランキング', component: 'cards-city-rank' },
      ]
    },
    contentsList() {
      return this.contentsAll[this.governmentType].map((d) => {
        const prefName = this.prefName
        const prefCode = this.prefCode
        const statisticsClass = this.statisticsClass

        // 都道府県コードを5桁に変換してcdAreaに格納
        d.params.cdArea = ('0000000000' + prefCode).slice(-2) + '000'

        return {
          cardComponent: d.cardComponent,
          contents: {
            statisticsClass,
            governmentType: this.governmentType,
            title: `${prefName}の${d.title}`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${statisticsClass}/${d.titleId}/timechart/${this.governmentType}/${prefCode}/`,
            unit: d.unit,
            params: d.params,
          },
        }
      })
    },
  },
  methods: {
    change() {
      EventBus.$emit(TOGGLE_EVENT)
    },
  },
  head() {
    return {
      title: '住宅・土地・建設',
    }
  },
}
export default Vue.extend(options)
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
