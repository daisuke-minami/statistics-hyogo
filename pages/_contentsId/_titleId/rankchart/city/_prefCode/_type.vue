<template>
  <component :is="cardComponent" :city-list="cityList" :contents="contents" />
</template>

<script>
export default {
  async asyncData() {
    const cityList = await (await import(`~/static/codes/cityList.json`)).result
    const prefList = await (await import(`~/static/codes/prefList.json`)).result
    return { cityList, prefList }
  },
  data() {
    return {
      governmentType: 'city',
    }
  },
  computed: {
    prefCode() {
      return this.$route.params.prefCode
    },
    prefName() {
      return this.prefList((d) => d.prefCode === this.prefCode).prefName
    },
    contentsId() {
      return this.$route.params.contentsId
    },
    titleId() {
      return this.$route.params.titleId
    },
    contentsAll() {
      return require(`~/data/pagesetting/${this.contentsId}.json`)
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
