<template>
  <component :is="cardComponent" :city-list="cityList" :contents="contents" />
</template>

<script>
import prefJson from '~/data/codes/preflist.json'
import cityJson from '~/data/codes/citylist.json'

export default {
  // async asyncData({ params }) {
  //   const cityList = (await import(`~/data/codes/citylist.json`)).result
  //   const prefList = (await import(`~/data/codes/preflist.json`)).result
  //   const contentsId = params.contentsId
  //   const contentsAll = await import(`~/data/pagesetting/${contentsId}.json`)
  //   return { cityList, prefList, contentsId, contentsAll }
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
      return this.$route.params.prefCode
    },
    prefName() {
      return this.prefList.find((d) => d.prefCode === this.prefCode).prefName
    },
    titleId() {
      return this.$route.params.titleId
    },
    contentsId() {
      return this.$route.params.contentsId
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
  created() {
    // console.log('contentsAll:', this.contentsAll)
    // console.log('contentsList:', this.contentsList)
    // console.log('perfCode:', this.prefCode)
    // console.log('cityList:', this.cityList)
  },
}
</script>
