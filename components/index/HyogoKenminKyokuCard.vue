<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card>
          <data-view
            :title="cardConfig.graphTitle"
            :title-id="cardConfig.titleId"
          >
            <client-only>
              <div id="map-wrap">
                <l-map :zoom="8" :center="[34.6908791, 135.1826546]">
                  <l-tile-layer
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  />
                  <template v-for="item in displayData">
                    <l-marker :key="item.name" :lat-lng="item.latlng">
                      <l-popup>
                        <div>
                          {{ item.name }} <br />
                          {{ item.postNumber }}
                          {{ item.address }}<br />
                          TEL:{{ item.phoneNumber }}
                        </div>
                      </l-popup>
                    </l-marker>
                  </template>
                </l-map>
              </div>
            </client-only>

            <template v-slot:dataTable>
              <client-only>
                <data-view-table :headers="tableHeaders" :items="tableData" />
              </client-only>
            </template>
          </data-view>
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script>
import DataView from '@/components/DataView.vue'
import DataViewTable from '@/components/DataViewTable.vue'
import KenminKyoku from '@/data/common/kenminkyoku.json'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    DataView,
    DataViewTable,
  },
  props: {
    cityCode: {
      type: String,
      default: '',
    },
    cityName: {
      type: String,
      default: '',
    },
  },
  computed: {
    keys() {
      return KenminKyoku.map((item) => item['名称'])
    },
    displayData() {
      // const cityCodes = process.env.cityList.map((d) => d.cityCode)
      // const prefCode = `${process.env.PREF_CODE}000`
      // const rankType = ['prefmap', 'prefbar', 'citymap', 'citybar']
      // const timePrefList = process.env.Contents.reduce((acc, cur) => {
      //   if ('prefecture' in cur) {
      //     acc.push(cur)
      //   }
      //   return acc
      // }, [])
      //   .map((d) => d.titleId)
      //   .map((item) => {
      //     return `/${item}/${prefCode}/time`
      //   })

      // const timeCityList = process.env.Contents.reduce((acc, cur) => {
      //   if ('city' in cur) {
      //     acc.push(cur)
      //   }
      //   return acc
      // }, [])
      //   .map((d) => d.titleId)
      //   .map((item) => {
      //     return cityCodes.map((c) => {
      //       return `/${item}/${c}/time`
      //     })
      //   })
      //   .reduce((acc, cur) => acc.concat(cur), [])

      // const rankList = process.env.Contents.filter((d) => d.isRank !== false)
      //   .map((d) => d.titleId)
      //   .map((item) => {
      //     return rankType.map((d) => {
      //       return `/${item}/${prefCode}/${d}`
      //     })
      //   })
      //   .reduce((acc, cur) => acc.concat(cur), [])

      // const routes = JSON.stringify(timePrefList.concat(timeCityList, rankList))
      // console.log(routes)

      return KenminKyoku.map((item, j) => ({
        name: item['名称'],
        postNumber: item['郵便番号'],
        address: item['所在地'],
        phoneNumber: item['電話番号'],
        latlng: [KenminKyoku[j]['緯度'], KenminKyoku[j]['経度']],
      }))
    },
    cardConfig() {
      return {
        graphTitle: '県庁／県民局の所在地',
        titleId: "'hyogo-population-chart'",
        graphId: "'hyogo-population-chart-graph'",
      }
    },
    tableHeaders() {
      return [
        { text: '名称', value: 'name' },
        { text: '郵便番号', value: 'postNumber' },
        { text: '所在地', value: 'address' },
        { text: '電話番号', value: 'phoneNumber' },
      ]
    },
    tableData() {
      return KenminKyoku.map((item) => ({
        name: item['名称'],
        postNumber: item['郵便番号'],
        address: item['所在地'],
        phoneNumber: item['電話番号'],
      }))
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style>
#map-wrap {
  width: 100%;
  height: 400px;
}
</style>
