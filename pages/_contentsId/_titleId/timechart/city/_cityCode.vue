<template>
  <component :is="cardComponent" :contents="contents" />
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
    ...mapGetters('cityList', ['getCityList', 'getCityName']),
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
      return this.getCityName(this.cityCode)
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
