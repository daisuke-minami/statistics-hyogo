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
                <l-map :zoom="zoom" :center="center">
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
import KenminKyoku from '@/assets/json/kenminkyoku.json'
import 'leaflet/dist/leaflet.css'

export default {
  // props: {
  //   cityCode: {
  //     type: String,
  //     default: '',
  //   },
  //   cityName: {
  //     type: String,
  //     default: '',
  //   },
  // },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [34.9208791, 134.8826546],
    }
  },
  computed: {
    keys() {
      return KenminKyoku.map((item) => item['名称'])
    },
    displayData() {
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
}
</script>

<style>
#map-wrap {
  width: 100%;
  height: 400px;
}
</style>
