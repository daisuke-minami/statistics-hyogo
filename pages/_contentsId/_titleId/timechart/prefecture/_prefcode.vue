<template>
  <component :is="cardComponent" :contents="contents" />
</template>

<script>
// import prefList from '~/static/codes/preflist.json'
import prefJson from '@/static/codes/preflist.json'

export default {
  data() {
    return {
      governmentType: 'prefecture',
    }
  },
  computed: {
    prefList() {
      return prefJson.result
    },
    contentsId() {
      return this.$route.params.contentsId
    },
    titleId() {
      return this.$route.params.titleId
    },
    prefCode() {
      // return this.$route.params.prefcode
      return Number(this.$route.params.prefcode)
    },
    prefName() {
      return this.prefList.find((d) => d.prefCode === this.prefCode).prefName
    },
    contentsAll() {
      return require(`~/static/pagesetting/${this.contentsId}.json`)
    },
    contents() {
      // console.log(this.contentsAll)
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
    console.log('contentsId', this.contentsId)
    console.log('titleId', this.titleId)
    console.log('prefCode', this.prefCode)
    console.log('prefList', this.prefList)
  },
}
</script>
