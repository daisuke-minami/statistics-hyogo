<template>
  <div>
    <tab-chart-class :statistics-class="statisticsClass" />
    <!-- カテゴリ選択  -->
    <select-title v-model="titleId" :contents-list="contentsList" />

    <card-row class="DataBlock">
      <!-- Mapchart -->
      <estat-pref-rank-map-chart-card
        :pref-list="prefList"
        :contents="contents"
      />
      <!-- Barchart -->
      <estat-pref-rank-bar-chart-card
        :pref-list="prefList"
        :contents="contents"
      />
    </card-row>
  </div>
</template>

<script>
import { mdiHeart } from '@mdi/js'
// import Vue from 'vue'
// import { cloneDeep } from 'lodash'
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
      governmentType: 'prefecture',
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
      return this.contentsAll[this.governmentType].filter(
        (d) => d.isRank === true
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
          // 都道府県コードを5桁に変換してcdAreaに格納
          d.params.cdArea = this.prefList.map(
            (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
          )

          return {
            statisticsClass: this.statisticsClass,
            governmentType: this.governmentType,
            title: `都道府県別${d.title}ランキング`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${this.statisticsClass}/${d.titleId}/rankchart/${this.governmentType}`,
            unit: d.unit,
            params: d.params,
          }
        })
        .find((d) => d.titleId === titleId())
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
