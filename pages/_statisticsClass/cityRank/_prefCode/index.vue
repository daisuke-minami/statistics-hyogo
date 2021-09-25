<template>
  <div>
    <div>
      <tab-chart-class :statistics-class="statisticsClass" />
      <!-- カテゴリ選択  -->
      <select-title v-model="titleId" :contents-list="contentsList" />

      <card-row class="DataBlock">
        <!-- Rankchart -->
        <estat-city-rank-card :city-list="cityList" :contents="contents" />
        <!-- Googleアドセンス -->
        <!-- <adsense-card /> -->
      </card-row>
    </div>
  </div>
</template>

<script>
// import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  components: {
    // ScaleLoader,
  },
  async asyncData({ params }) {
    const contentsAll = await import(
      `~/static/pagesetting/${params.statisticsClass}.json`
    )
    return { contentsAll }
  },
  data() {
    return {
      titleId: null,
      chartClass: 'cityRank',
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
    statisticsClass() {
      return this.$route.params.statisticsClass
    },
    contentsList() {
      return this.contentsAll[this.chartClass.replace('Rank', '')]
        .filter((f) => f.isRank === true)
        .map((d) => {
          // ShallowCopyを避けるため、lodashのcloneDeepを用いる。
          const contents = cloneDeep(d)

          // 都道府県リストをcdAreaに格納
          contents.estatParams.cdArea = this.cityList.map((d) => d.cityCode)

          // 動的ルーティングのパスを追加
          contents.route = `${this.prefCode}/${d.titleId}`

          // estatResponseのパスを追加
          contents.estatJsonPath = `${
            this.statisticsClass
          }/${this.chartClass.replace('Rank', '')}/${contents.titleId}.json`

          return { ...contents }
        })
    },
    contents() {
      return this.contentsList.find((f) => f.titleId === this.titleId)
    },
  },
  watch: {
    bigcityKind() {
      // this.$fetch()
    },
    titleId() {
      // this.$fetch()
    },
  },
  created() {
    // 統計項目選択の初期値
    this.titleId = this.contentsList[0].titleId
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
