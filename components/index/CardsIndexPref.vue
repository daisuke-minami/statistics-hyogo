<template>
  <div>
    <card-row class="DataBlock">
      <!-- 県民局 -->
      <hyogo-kenmin-kyoku-card :city-code="'-'" :city-name="'兵庫県'" />
    </card-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardRow from '@/components/CardRow.vue'

import HyogoKenminKyokuCard from '@/components/index/HyogoKenminKyokuCard.vue'

export default Vue.extend({
  components: {
    CardRow,
    HyogoKenminKyokuCard,
  },
})
</script>

<style lang="scss" scoped>
.DataBlock {
  margin: 20px -8px;

  .DataCard {
    @include largerThan($medium) {
      padding: 10px;
    }

    @include lessThan($small) {
      padding: 4px 8px;
    }
  }
}
</style>
