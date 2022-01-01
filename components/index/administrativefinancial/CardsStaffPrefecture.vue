<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 一般行政部門職員数
const AdministrativeStaff = () => {
  return import(
    '~/components/index/administrativefinancial/cards/staff/administrativeStaffPrefecture.vue'
  )
}

// 消防部門職員数
const FireDepartmentStaff = () => {
  return import(
    '~/components/index/administrativefinancial/cards/staff/fireDepartmentStaffPrefecture.vue'
  )
}

// 教育部門職員数
const EducationDepartmentStaff = () => {
  return import(
    '~/components/index/administrativefinancial/cards/staff/educationDepartmentStaffPrefecture.vue'
  )
}

// 警察部門職員数
const PoliceDepartmentStaff = () => {
  return import(
    '~/components/index/administrativefinancial/cards/staff/policeDepartmentStaffPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [AdministrativeStaff, FireDepartmentStaff],
      [EducationDepartmentStaff, PoliceDepartmentStaff],
    ])

    return {
      rows,
    }
  },
})
</script>
