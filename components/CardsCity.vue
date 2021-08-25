<template>
  <div>
    <!-- 市区町村のセレクトボックス  -->
    <city-select-card v-model="cityCode" :city-list="cityList" />

    <div v-if="$fetchState.pending" class="loader">
      <scale-loader color="#01A0C7" />
    </div>
    <card-row v-else class="DataBlock">
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
import { mapActions, mapGetters } from 'vuex'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export type DataType = {
  cityCode: string
  isPref: boolean
  lgType: 'prefecture' | 'city'
}

export default Vue.extend({
  components: {
    ScaleLoader,
  },
  props: {
    contentsId: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-prop-types
    contentsAll: {
      // type: Object,
      required: true,
    },
  },
  async fetch() {
    // 市区町村選択時のリロード用ダミー
  },
  data(): DataType {
    return {
      cityCode: '',
      governmentType: 'city',
    }
  },
  computed: {
    ...mapGetters('cityList', [
      'getSelectedCityCode',
      'getCityList',
      'getCityName',
    ]),
    cityList() {
      return this.getCityList
    },
    cityName() {
      return this.getCityName(this.cityCode)
    },
    contentsList() {
      return this.contentsAll[this.governmentType].map((d) => {
        const cityName = this.cityName
        const cityCode = this.cityCode
        d.params.cdArea = cityCode

        const contentsId = this.contentsId

        return {
          cardComponent: d.cardComponent,
          contents: {
            contentsId,
            governmentType: this.governmentType,
            title: `${cityName}の${d.title}`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${contentsId}/${d.titleId}/timechart/${this.governmentType}/${cityCode}/`,
            unit: d.unit,
            params: d.params,
          },
        }
      })
    },
  },
  watch: {
    cityCode(): void {
      this.$fetch()
      this.changeSelectedCity(this.cityCode)
    },
  },
  created(): void {
    this.cityCode = this.getSelectedCityCode
  },
  methods: {
    ...mapActions('cityList', ['changeSelectedCity']),
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
</style>
