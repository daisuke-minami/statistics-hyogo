<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 防犯ボランティア
const CrimePreventionVolunteer = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/crimePreventionVolunteerPrefecture.vue'
  )
}

// 外国人被疑事件受理人員
const AcceptingAllegedForeigners = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/acceptingAllegedForeignersPrefecture.vue'
  )
}

// 民事事件
const CivilCases = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/civilCasesPrefecture.vue'
  )
}

// 行政事件
const AdministrativeCases = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/administrativeCasesPrefecture.vue'
  )
}

// 家事事件
const DomesticAffairs = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/domesticAffairsPrefecture.vue'
  )
}

// 特別法犯
const SpecialLaw = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/specialLawPrefecture.vue'
  )
}

// 売春事犯
const Prostitution = () => {
  return import(
    '~/components/index/safetyenvironment/cards/crime/prostitutionPrefecture.vue'
  )
}
export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [CrimePreventionVolunteer, AcceptingAllegedForeigners],
      [CivilCases, AdministrativeCases],
      [DomesticAffairs, SpecialLaw],
      [Prostitution],
    ])

    return {
      rows,
    }
  },
})
</script>
