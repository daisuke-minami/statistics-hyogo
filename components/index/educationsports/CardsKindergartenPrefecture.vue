<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 幼稚園数
const Kindergartens = () => {
  return import(
    '~/components/index/educationsports/cards/kindergarten/kindergartensPrefecture.vue'
  )
}

// 幼稚園教員数
const KindergartenTeachers = () => {
  return import(
    '~/components/index/educationsports/cards/kindergarten/kindergartenTeachersPrefecture.vue'
  )
}

// 幼稚園児童数
const KindergartenChildren = () => {
  return import(
    '~/components/index/educationsports/cards/kindergarten/kindergartenChildrenPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [Kindergartens, KindergartenTeachers],
      [KindergartenChildren],
    ])

    return {
      rows,
    }
  },
})
</script>
