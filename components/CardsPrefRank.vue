<template>
  <div>
    <!-- カテゴリ選択  -->
    <category-select-card v-model="titleId" :contents-list="contentsList" />

    <div v-if="$fetchState.pending" class="loader">
      <scale-loader color="#01A0C7" />
    </div>
    <card-row v-else class="DataBlock">
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
      <!-- Googleアドセンス -->
      <adsense-card />
      <!-- Googleアドセンス -->
      <adsense-card />
    </card-row>
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
      governmentType: 'prefecture',
    }
  },
  computed: {
    ...mapGetters('prefList', ['getPrefList']),
    prefList() {
      return this.getPrefList
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
            contentsId: this.contentsId,
            governmentType: this.governmentType,
            title: `都道府県別${d.title}ランキング`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${this.contentsId}/${d.titleId}/rankchart/${this.governmentType}`,
            unit: d.unit,
            params: d.params,
          }
        })
        .find((d) => d.titleId === titleId())
    },
  },
  watch: {
    titleId() {
      this.$fetch()
    },
  },
  created() {},
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
