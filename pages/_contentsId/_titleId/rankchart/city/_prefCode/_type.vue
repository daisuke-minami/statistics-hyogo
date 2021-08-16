<template>
  <component :is="cardComponent" :city-list="cityList" :contents="contents" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      governmentType: 'city',
    }
  },
  computed: {
    ...mapGetters('cityList', ['getCityList']),
    ...mapGetters('prefList', ['getPrefName']),
    prefCode() {
      return this.$route.params.prefCode
    },
    prefName() {
      return this.getPrefName(this.prefCode)
    },
    contentsId() {
      return this.$route.params.contentsId
    },
    titleId() {
      return this.$route.params.titleId
    },
    cityList() {
      return this.getCityList
    },
    contentsAll() {
      return require(`~/static/pagesetting/${this.contentsId}.json`)
    },
    contentsList() {
      return this.contentsAll[this.governmentType].filter(
        (d) => d.isRank !== false
      )
    },
    contents() {
      return this.contentsList
        .map((d) => {
          // cdAreaを上書き
          d.params.cdArea = this.cityList.map((d) => d.cityCode)

          return {
            contentsId: this.contentsId,
            governmentType: this.governmentType,
            title: `市区町村別${d.title}ランキング`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${this.contentsId}/${d.titleId}/rankchart/${this.governmentType}`,
            unit: d.unit,
            params: d.params,
          }
        })
        .find((d) => d.titleId === this.titleId)
    },
    cardComponent() {
      let cardComponent
      switch (this.$route.params.type) {
        case 'map':
          cardComponent = 'estat-city-rank-map-chart-card'
          break
        case 'bar':
          cardComponent = 'estat-city-rank-bar-chart-card'
          break
      }
      return cardComponent
    },
  },
}
</script>
