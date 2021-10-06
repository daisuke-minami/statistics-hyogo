<template>
  <component
    :is="contents.cardComponent"
    :pref-list="prefList"
    :city-list="cityList"
    :contents="contents"
    :json="json"
  />
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params }) {
    console.log('ここには来ている')
    const contentsAll = await import(
      `~/static/pagesetting/${params.statisticsClass}.json`
    )
    return { contentsAll }
  },
  data() {
    return {
      cityCode: null,
      contentsAll: null,
      // chartClass: 'prefecture',
    }
  },
  computed: {
    ...mapGetters('prefList', [
      'getSelectedPrefCode',
      'getPrefName',
      'getPrefList',
    ]),
    ...mapGetters('cityList', ['getCityList']),
    ...mapGetters('pageSetting', ['getPageSetting']),
    pageSetting() {
      return this.getPageSetting(this.statisticsClass)
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
    cityList() {
      return this.getCityList
    },
    cityName() {
      return this.getCityName(this.cityCode)
    },
    statisticsClass() {
      return this.$route.params.statisticsClass
    },
    chartClass(): 'prefecture' | 'city' | 'prefectureRank' | 'cityRank' {
      return this.$route.params.chartClass
    },
    governmentType(): 'prefecture' | 'city' {
      return this.chartClass.replace('Rank', '')
    },
    titleId() {
      return this.$route.params.titleId
    },
    estatJsonPath() {
      return `${this.statisticsClass}/${this.governmentType}/${this.titleId}.json`
    },
    contents() {
      return this.pageSetting[this.governmentType]
        .find((f) => f.titleId === this.titleId)
        .map((d) => {
          // ShallowCopyを避けるため、lodashのcloneDeepを用いる。
          const contents = cloneDeep(d)

          // 都道府県の情報を追加
          contents.prefName = this.prefName
          contents.prefCode = this.prefCode

          switch (this.chartClass) {
            case 'prefecture':
              contents.title = `${this.prefName}の${d.title}`
              contents.route = `${this.prefCode}/${contents.titleId}/`
              break
            case 'city':
              contents.cityName = this.cityName
              contents.cityCode = this.cityCode
              contents.title = `${this.cityName}の${d.title}`
              contents.route = `${this.prefCode}/${this.cityCode}/${contents.titleId}/`
              break
            case 'prefectureRank':
              contents.cardComponent = 'estat-pref-rank-card'
              break
            case 'cityRank':
              contents.cardComponent = 'estat-city-rank-card'
              break
          }

          // estatResponseのパスを追加
          contents.estatJsonPath = `${this.statisticsClass}/${this.governmentType}/${contents.titleId}.json`

          return {
            ...contents,
          }
        })
    },
    // cardComponent() {
    //   return this.contentsAll[this.governmentType].find(
    //     (f) => f.titleId === this.titleId
    //   ).cardComponent
    // },
  },
  created() {
    console.log(this.contents)
  },
}
</script>
