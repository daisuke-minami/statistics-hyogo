<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <template>
        <v-card>
          <data-view
            :title="cardConfig.graphTitle"
            :title-id="cardConfig.titleId"
          >
            <v-row>
              <v-col>
                <data-selector-bigcitykind-card v-model="bigcityKind" />
              </v-col>
              <v-col>
                <v-select
                  v-model="targetYear"
                  :items="Times"
                  item-text="yearName"
                  item-value="year"
                  @change="$emit('input', $event)"
                />
              </v-col>
            </v-row>
            <client-only>
              <div id="map-wrap">
                <l-map :zoom="zoom" :center="center">
                  <l-tile-layer :url="url" :attribution="attribution" />
                  <l-geo-json :geojson="geojson" />
                </l-map>
              </div>
            </client-only>
          </data-view>
        </v-card>
      </template>
    </client-only>
  </v-col>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import * as topojson from 'topojson-client'

export default {
  props: {
    prefCode: {
      type: String,
      required: true,
    },
    prefName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [34.9208791, 134.8826546],
      geojson: null,
      topojson: null,
      targetYear: 20200101,
    }
  },
  computed: {
    cardConfig() {
      return {
        graphTitle: `${this.prefName}の市区町村`,
        titleId: "'hyogo-population-chart'",
        graphId: "'hyogo-population-chart-graph'",
      }
    },
    Times() {
      return [
        { yearName: '2020年', year: 20200101 },
        { yearName: '2019年', year: 20190101 },
      ]
    },
  },
  async created() {
    const response = await fetch(
      'https://geoshape.ex.nii.ac.jp/city/topojson/20200101/28/28_city_dc.l.topojson'
    )
    this.topojson = await response.json()
    this.geojson = this._convTopoJsonToGeoJson(this.topojson, 'city')
  },
  // mounted() {},
  methods: {
    _convTopoJsonToGeoJson(topo, obj) {
      return topojson.feature(topo, topo.objects[obj])
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
