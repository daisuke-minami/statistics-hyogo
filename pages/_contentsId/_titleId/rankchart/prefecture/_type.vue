<template>
  <component :is="cardComponent" :pref-list="prefList" :contents="contents" />
</template>

<script>
import prefJson from '@/static/codes/preflist.json'

export default {
  // async asyncData({ params }) {
  //   const prefList = (await import(`~/static/codes/preflist.json`)).result
  //   const statisticsClass = params.statisticsClass
  //   const contentsAll = await import(`~/static/pagesetting/${statisticsClass}.json`)
  //   return { prefList, statisticsClass, contentsAll }
  // },
  data() {
    return {
      governmentType: 'prefecture',
    }
  },
  computed: {
    statisticsClass() {
      return this.$route.params.statisticsClass
    },
    contentsAll() {
      return require(`~/static/pagesetting/${this.statisticsClass}.json`)
    },
    prefList() {
      return prefJson.result
    },
    titleId() {
      return this.$route.params.titleId
    },
    contentsList() {
      return this.contentsAll[this.governmentType].filter(
        (d) => d.isRank !== false
      )
    },
    contents() {
      return this.contentsList
        .map((d) => {
          // 都道府県コードを5桁に変換してcdAreaに格納
          d.params.cdArea = this.prefList.map(
            (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
          )

          return {
            statisticsClass: this.statisticsClass,
            governmentType: this.governmentType,
            title: `都道府県別${d.title}ランキング`,
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
          cardComponent = 'estat-pref-rank-map-chart-card'
          break
        case 'bar':
          cardComponent = 'estat-pref-rank-bar-chart-card'
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
