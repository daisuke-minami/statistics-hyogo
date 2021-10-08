<template>
  <div>
    <!-- <tab-chart-class :statistics-class="statisticsClass" /> -->

    <div>
      <card-row class="DataBlock">
        <component
          :is="contents.cardComponent"
          :city-list="cityList"
          :contents="contents"
        />
      </card-row>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params }) {
    // console.log('ここには来ている')
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
    ...mapGetters('prefList', [
      'getSelectedPrefCode',
      'getPrefName',
      'getPrefList',
    ]),
    ...mapGetters('cityList', [
      'getSelectedCityCode',
      'getCityList',
      'getCityName',
    ]),
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

    titleId() {
      return this.$route.params.titleId
    },
    estatJsonPath() {
      return `${this.statisticsClass}/${this.governmentType}/${this.titleId}.json`
    },
    contentsList() {
      return this.contentsAll[this.governmentType].map((d) => {
        // ShallowCopyを避けるため、lodashのcloneDeepを用いる。
        const contents = cloneDeep(d)

        // 都道府県の情報を追加
        contents.prefName = this.prefName
        contents.prefCode = this.prefCode

        // contents.prefList = this.prefList
        // contents.route = `../${this.statisticsClass}/${contents.titleId}/`

        contents.cardComponent = 'estat-city-rank-card'

        // estatResponseのパスを追加
        contents.estatJsonPath = `${this.statisticsClass}/${this.governmentType}/${contents.titleId}.json`

        // console.log(d)
        return {
          ...contents,
        }
      })
    },
    contents() {
      return this.contentsList.find((f) => f.titleId === this.titleId)
    },
    // cardComponent() {
    //   return this.contentsAll[this.governmentType].find(
    //     (f) => f.titleId === this.titleId
    //   ).cardComponent
    // },
  },
  created() {
    // console.log(this.contents)
  },
}
</script>
