<template>
  <cards-lazy-row :rows="rows" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CardsLazyRow from '~/components/index/_shared/CardRow/CardsLazyRow.vue'

// 火災件数
const Fires = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fires/firesPrefecture.vue'
  )
}

// 火災損害額
const FireDamageAmount = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fires/fireDamageAmountPrefecture.vue'
  )
}

// 火災死傷者数
const FireCasualties = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fires/fireCasualtiesPrefecture.vue'
  )
}

// 火災保険新規契約件数
const NewFireInsurance = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fires/newFireInsurancePrefecture.vue'
  )
}

// 火災保険保険金支払件数
const FireInsuranceClaimsPaid = () => {
  return import(
    '~/components/index/safetyenvironment/cards/fires/fireInsuranceClaimsPaidPrefecture.vue'
  )
}

export default defineComponent({
  components: {
    CardsLazyRow,
  },
  setup() {
    // Card
    const rows = ref([
      [Fires, FireDamageAmount],
      [FireCasualties, NewFireInsurance],
      [FireInsuranceClaimsPaid],
    ])

    return {
      rows,
    }
  },
})
</script>
