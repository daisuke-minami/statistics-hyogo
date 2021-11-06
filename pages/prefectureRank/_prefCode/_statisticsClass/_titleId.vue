<template>
  <div>
    <card-row class="DataBlock">
      <lazy-component
        :is="contents.cardComponent"
        :pref-list="prefList"
        :contents="contents"
      />
    </card-row>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params }) {
    const contentsAll = await import(
      `~/static/pagesetting/${params.statisticsClass}.json`
    )
    return { contentsAll }
  },
  data() {
    return {
      chartClass: 'prefectureRank',
      governmentType: 'prefecture',
      cityCode: null,
    }
  },
  computed: {
    ...mapGetters('prefList', [
      'getSelectedPrefCode',
      'getPrefName',
      'getPrefList',
    ]),
    ...mapGetters('setting', ['getStatisticsClassName']),
    statisticsClass() {
      return this.$route.params.statisticsClass
    },
    statisticsClassName() {
      return this.getStatisticsClassName(this.statisticsClass)
    },
    prefList() {
      return this.getPrefList
    },
    prefCode() {
      return this.getSelectedPrefCode
    },
    prefName() {
      return this.getPrefName(this.prefCode)
    },
    cityName() {
      return this.getCityName(this.cityCode)
    },
    titleId() {
      return this.$route.params.titleId
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

        contents.prefList = this.prefList
        contents.route = `/${this.chartClass}/${this.prefCode}/${this.statisticsClass}/`

        contents.cardComponent = 'estat-pref-rank-card'

        return {
          ...contents,
        }
      })
    },
    contents() {
      return this.contentsList.find((f) => f.titleId === this.titleId)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  created() {},
}
</script>
