<template>
  <div>
    <tab-chart-class :statistics-class="statisticsClass" />
    <!-- カテゴリ選択  -->
    <select-title v-model="titleId" :contents-list="contentsList" />

    <card-row class="DataBlock">
      <!-- Rankchart -->
      <estat-pref-rank-card :pref-list="prefList" :contents="contents" />
      <!-- Googleアドセンス -->
      <!-- <adsense-card /> -->
    </card-row>
  </div>
</template>

<script>
import { mdiHeart } from '@mdi/js'
// import Vue from 'vue'
import { cloneDeep } from 'lodash'
// import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    // ScaleLoader,
  },
  // async fetch() {
  //   // リロード用ダミー
  // },
  async asyncData({ params }) {
    const contentsAll = await import(
      `~/static/pagesetting/${params.statisticsClass.replace('Rank', '')}.json`
    )
    return { contentsAll }
  },
  data() {
    return {
      mdiHeart,
      titleId: null,
      chartClass: 'prefectureRank',
    }
  },
  computed: {
    ...mapGetters('prefList', ['getSelectedPrefCode', 'getPrefList']),
    prefCode() {
      return this.getSelectedPrefCode
    },
    prefList() {
      return this.getPrefList
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
          // contents.estatParams.cdArea = this.prefList.map(
          //   (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
          // )
          contents.prefList = this.prefList

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
      // console.log(this.contentsList)
      return this.contentsList.find((f) => f.titleId === this.titleId)
    },
  },
  watch: {
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
