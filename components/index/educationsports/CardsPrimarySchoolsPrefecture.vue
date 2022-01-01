<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 小学校数
const PrimarySchools = () => {
  return import(
    '~/components/index/educationsports/cards/primary-schools/primarySchoolsPrefecture.vue'
  )
}

// 小学校教員数
const PrimarySchoolTeachers = () => {
  return import(
    '~/components/index/educationsports/cards/primary-schools/primarySchoolTeachersPrefecture.vue'
  )
}

// 小学校児童数
const PrimarySchoolStudents = () => {
  return import(
    '~/components/index/educationsports/cards/primary-schools/primarySchoolStudentsPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [PrimarySchools, PrimarySchoolTeachers],
      [PrimarySchoolStudents],
    ])

    return {
      rows,
    }
  },
})
</script>
