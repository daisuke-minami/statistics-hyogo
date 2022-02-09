<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import CardsLazyRow from '@/components/index/_shared/CardsLazyRow.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

// 結婚件数
const Marriage = () => {
  return import(
    '~/components/index/population/cards/marriage/marriagePrefecture.vue'
  )
}

// 離婚件数
const Divorce = () => {
  return import(
    '~/components/index/population/cards/marriage/divorcePrefecture.vue'
  )
}

// 平均初婚年齢
const FirstMarriageAge = () => {
  return import(
    '~/components/index/population/cards/marriage/firstMarriageAgePrefecture.vue'
  )
}

// 未婚人口
const Unmarried = () => {
  return import(
    '~/components/index/population/cards/marriage/unmarriedPrefecture.vue'
  )
}

// 有配偶人口
// const Spouse = () => {
//   return import(
//     '~/components/index/population/cards/marriage/spousePrefecture.vue'
//   )
// }

// 離別人口
// const Separated = () => {
//   return import(
//     '~/components/index/population/cards/marriage/separatedPrefecture.vue'
//   )
// }

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [Marriage, Divorce],
      [FirstMarriageAge, Unmarried],
      // [Spouse],
    ])

    return {
      rows,
    }
  },
})
</script>
