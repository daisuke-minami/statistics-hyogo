<template>
  <component :is="cardComponent" :city-list="cityList" :contents="contents" />
</template>

<script>
import prefJson from '~/static/codes/preflist.json'
import cityJson from '~/static/codes/citylist.json'

export default {
  // async asyncData({ params }) {
  //   const cityList = (await import(`~/static/codes/citylist.json`)).result
  //   const prefList = (await import(`~/static/codes/preflist.json`)).result
  //   const statisticsClass = params.statisticsClass
  //   const contentsAll = await import(`~/static/pagesetting/${statisticsClass}.json`)
  //   return { cityList, prefList, statisticsClass, contentsAll }
  // },
  data() {
    return {
      governmentType: 'city',
    }
  },
  computed: {
    prefList() {
      return prefJson.result
    },
    cityList() {
      return cityJson.result
    },
    prefCode() {
      return this.$route.params.prefcode
    },
    prefName() {
      return this.prefList.find((d) => d.prefCode === this.prefCode).prefName
    },
    titleId() {
      return this.$route.params.titleId
    },
    statisticsClass() {
      return this.$route.params.statisticsClass
    },
    contentsAll() {
      return require(`~/static/pagesetting/${this.statisticsClass}.json`)
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
            statisticsClass: this.statisticsClass,
            governmentType: this.governmentType,
            title: `市区町村別${d.title}ランキング`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${this.statisticsClass}/${d.titleId}/rankchart/${this.governmentType}`,
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
  created() {
    // console.log('contentsAll:', this.contentsAll)
    // console.log('contentsList:', this.contentsList)
    // console.log('perfCode:', this.prefCode)
    // console.log('cityList:', this.cityList)
  },
}
</script>
