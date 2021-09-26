<template>
  <component
    :is="contents.cardComponent"
    :pref-list="prefList"
    :city-list="cityList"
    :contents="contents"
  />
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params, payload }) {
    if (payload) {
      const contentsAll = payload
      return { contentsAll }
    }
    const contentsAll = await import(
      `~/static/pagesetting/${params.statisticsClass}.json`
    )
    return { contentsAll }
  },
  // async fetch() {
  //   this.contentsAll = await import(
  //     `~/static/pagesetting/${this.statisticsClass}.json`
  //   )
  // },
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
      console.log('statisticsClass', this.statisticsClass)
      console.log('chartClass', this.chartClass)
      console.log('titleId', this.titleId)
      console.log('contentsAll', this.contentsAll)
      console.log('prefCode', this.prefCode)
      console.log('estatJsonPath', this.estatJsonPath)
      return this.contentsAll[this.governmentType]
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
        .find((f) => f.titleId === this.titleId)
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
