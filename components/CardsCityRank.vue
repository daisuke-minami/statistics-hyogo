<template>
  <div>
    <div>
      <!-- カテゴリ選択  -->
      <category-select-card v-model="titleId" :contents-list="contentsList" />

      <div v-if="$fetchState.pending" class="loader">
        <scale-loader color="#01A0C7" />
      </div>
      <card-row v-else class="DataBlock">
        <!-- Mapchart -->
        <estat-city-rank-map-chart-card
          :city-list="cityList"
          :contents="contents"
        />
        <!-- Barchart -->
        <estat-city-rank-bar-chart-card
          :city-list="cityList"
          :contents="contents"
        />
        <!-- Googleアドセンス -->
        <adsense-card />
        <!-- Googleアドセンス -->
        <adsense-card />
      </card-row>
    </div>
  </div>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ScaleLoader,
  },
  props: {
    contentsId: {
      type: String,
      required: true,
    },
    contentsAll: {
      // type: Object,
      required: true,
    },
  },
  async fetch() {
    // リロード用ダミー
  },
  data() {
    return {
      titleId: null,
      governmentType: 'city',
    }
  },
  computed: {
    ...mapGetters('cityList', ['getCityList']),
    ...mapGetters('prefList', ['getSelectedPrefCode', 'getPrefName']),
    cityList() {
      return this.getCityList
    },
    prefCode() {
      return this.getSelectedPrefCode
    },
    prefName() {
      return this.getPrefName(this.prefCode)
    },
    contentsList() {
      return this.contentsAll[this.governmentType].filter(
        (item) => item.isRank === true
      )
    },
    contents() {
      const titleId = () => {
        if (this.titleId) {
          return this.titleId
        } else {
          return this.contentsList[0].titleId
        }
      }

      return this.contentsList
        .map((d) => {
          // cdAreaを上書き
          d.params.cdArea = this.cityList.map((d) => d.cityCode)

          return {
            contentsId: this.contentsId,
            governmentType: this.governmentType,
            title: `${this.prefName}の市区町村別${d.title}ランキング`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${this.contentsId}/${d.titleId}/rankchart/${this.governmentType}/${this.prefCode}`,
            unit: d.unit,
            params: d.params,
          }
        })
        .find((d) => d.titleId === titleId())
    },
  },
  watch: {
    bigcityKind() {
      this.$fetch()
    },
    titleId() {
      this.$fetch()
    },
  },
}
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
