<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <latest-informationTable
        :title="tableTitle"
        :title-id="'latest-information'"
        :headers="tableHeaders"
        :items="tableData"
      >
        <template v-slot:additionalDescription>
          <span>（注）</span>
          <ul>
            <li>政府統計の総合窓口「e-stat」より取得</li>
          </ul>
        </template>
      </latest-informationTable>
    </client-only>
  </v-col>
</template>

<script>
import LatestInformationTable from './LatestInformationTable.vue'

export default {
  components: {
    LatestInformationTable,
  },
  props: {
    estatJson: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatData() {
      return this.$formatEstatDataToLatestInformationTable(this.estatJson)
    },
    tableTitle() {
      return `${this.formatData.cityName}の最新統計`
    },
    tableHeaders() {
      return this.formatData.tableHeaders
    },
    tableData() {
      return this.formatData.tableData
    },
  },
}
</script>
