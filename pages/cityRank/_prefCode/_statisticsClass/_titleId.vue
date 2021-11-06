<template>
  <div>
    <card-row class="DataBlock">
      <lazy-component
        :is="contents.cardComponent"
        :city-list="cityList"
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
      chartClass: 'cityRank',
      governmentType: 'city',
      cityCode: null,
    }
  },
  computed: {
    ...mapGetters('prefList', ['getSelectedPrefCode', 'getPrefName']),
    ...mapGetters('cityList', ['getCityList']),
    prefCode() {
      return this.getSelectedPrefCode
    },
    prefName() {
      return this.getPrefName(this.prefCode)
    },
    cityList() {
      return this.getCityList
    },
    statisticsClass() {
      return this.$route.params.statisticsClass
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

        contents.route = `/${this.chartClass}/${this.prefCode}/${this.statisticsClass}/`
        contents.cardComponent = 'estat-city-rank-card'

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
