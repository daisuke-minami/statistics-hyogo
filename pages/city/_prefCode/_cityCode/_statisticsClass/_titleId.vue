<template>
  <div>
    <card-row class="DataBlock">
      <lazy-component :is="contents.cardComponent" :contents="contents" />
    </card-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
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
      chartClass: 'city',
      governmentType: 'city',
      tab: null,
    }
  },
  computed: {
    ...mapGetters('prefList', ['getSelectedPrefCode', 'getPrefName']),
    ...mapGetters('cityList', ['getSelectedCity', 'getCityName']),
    ...mapGetters('setting', ['getStatisticsClassName']),
    statisticsClass() {
      return this.$route.params.statisticsClass
    },
    statisticsClassName() {
      return this.getStatisticsClassName(this.statisticsClass)
    },
    titleId() {
      return this.$route.params.titleId
    },
    prefCode(): number {
      return this.getSelectedPrefCode
    },
    prefName(): string {
      return this.getPrefName(this.prefCode)
    },
    cityCode() {
      return this.$route.params.cityCode
    },
    cityName() {
      return this.getCityName(this.cityCode)
    },
    contentsList() {
      return this.contentsAll[this.governmentType].map((d) => {
        // ShallowCopyを避けるため、lodashのcloneDeepを用いる。
        const contents = cloneDeep(d)

        // 統計情報を追加
        contents.statisticsClass = this.statisticsClass
        contents.chartClass = this.chartClass
        contents.governmentType = this.governmentType

        // 都道府県の情報を追加
        contents.prefName = this.prefName
        contents.prefCode = this.prefCode

        contents.cityName = this.cityName
        contents.cityCode = this.cityCode

        contents.title = `${this.cityName}の${d.title}`
        contents.route = `/${this.chartClass}/${this.prefCode}/${this.cityCode}/${this.statisticsClass}/`

        return {
          ...contents,
        }
      })
    },
    contents() {
      return this.contentsList.find((f) => f.titleId === this.titleId)
    },
  },
  created(): void {},
  methods: {},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  head() {
    return {
      title: `${this.contents.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.contents.title}`,
        },
      ],
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
