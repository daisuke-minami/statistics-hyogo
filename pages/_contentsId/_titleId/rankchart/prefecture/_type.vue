<template>
  <component :is="cardComponent" :pref-list="prefList" :contents="contents" />
</template>

<script>
export default {
  async asyncData() {
    const prefList = await (await import(`~/static/codes/prefList.json`)).result
    return { prefList }
  },
  data() {
    return {
      governmentType: 'prefecture',
    }
  },
  computed: {
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
          // 都道府県コードを5桁に変換してcdAreaに格納
          d.params.cdArea = this.prefList.map(
            (d) => ('0000000000' + d.prefCode).slice(-2) + '000'
          )

          return {
            contentsId: this.contentsId,
            governmentType: this.governmentType,
            title: `都道府県別${d.title}ランキング`,
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
          cardComponent = 'estat-pref-rank-map-chart-card'
          break
        case 'bar':
          cardComponent = 'estat-pref-rank-bar-chart-card'
          break
      }
      return cardComponent
    },
  },
}
</script>
