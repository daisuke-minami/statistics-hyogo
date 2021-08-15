<template>
  <component :is="cardComponent" :contents="contents" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store }) {
    if (store.getters['prefList/getPrefList'].length) {
      return
    }
    await store.dispatch('prefList/fetchPrefs')
    await store.dispatch('cityList/fetchCities')
  },
  data() {
    return {
      governmentType: 'prefecture',
    }
  },
  computed: {
    ...mapGetters('prefList', ['getPrefName']),
    contentsId() {
      return this.$route.params.contentsId
    },
    titleId() {
      return this.$route.params.titleId
    },
    prefCode() {
      return Number(this.$route.params.prefCode)
      // return 28
    },
    prefName() {
      return this.getPrefName(this.prefCode)
      // return '兵庫県'
    },
    contentsAll() {
      return require(`~/data/pagesetting/${this.contentsId}.json`)
    },
    contents() {
      return this.contentsAll[this.governmentType]
        .map((d) => {
          const contentsId = this.contentsId

          // 都道府県コードを5桁に変換してcdAreaに格納
          d.params.cdArea = ('0000000000' + this.prefCode).slice(-2) + '000'

          return {
            contentsId,
            governmentType: this.governmentType,
            title: `${this.prefName}の${d.title}`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${contentsId}/${d.titleId}/timechart/${this.governmentType}/${this.prefCode}`,
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
  created() {
    // console.log(this.contents)
  },
}
</script>
