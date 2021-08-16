<template>
  <component :is="cardComponent" :contents="contents" />
</template>

<script>
export default {
  async asyncData() {
    const cityList = await import(`~/static/codes/cityList.json`).result
    return { cityList }
  },
  data() {
    return {
      governmentType: 'city',
    }
  },
  computed: {
    contentsId() {
      return this.$route.params.contentsId
    },
    titleId() {
      return this.$route.params.titleId
    },
    cityCode() {
      return this.$route.params.cityCode
    },
    cityName() {
      return this.cityList.find((d) => d.cityCode === this.cityCode).cityName
    },
    contentsAll() {
      return require(`~/data/pagesetting/${this.contentsId}.json`)
    },
    contents() {
      return this.contentsAll[this.governmentType]
        .map((d) => {
          d.params.cdArea = this.cityCode
          const contentsId = this.contentsId

          return {
            contentsId,
            governmentType: this.governmentType,
            title: `${this.cityName}の${d.title}`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${contentsId}/${d.titleId}/TimeChart//${this.governmentType}/${this.cityCode}`,
            unit: d.unit,
            params: d.params,
          }
        })
        .find((d) => d.titleId === this.titleId)
    },
    cardComponent() {
      return this.contentsAll[this.governmentType].find(
        (d) => d.titleId === this.titleId
      ).cardComponent
    },
  },
}
</script>
