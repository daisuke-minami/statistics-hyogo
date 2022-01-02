<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 消防本部・署数
const FireDepartment = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fireDepartment/fireDepartmentPrefecture.vue'
  )
}

// 消防団員数
const FireBrigade = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fireDepartment/fireBrigadePrefecture.vue'
  )
}

// 消防機関出動回数
const FireDepartmentDispatch = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fireDepartment/fireDepartmentDispatchPrefecture.vue'
  )
}

// 救急出動回数
const EmergencyDispatch = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fireDepartment/emergencyDispatchPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [FireDepartment, FireBrigade],
      [FireDepartmentDispatch, EmergencyDispatch],
    ])

    return {
      rows,
    }
  },
})
</script>
