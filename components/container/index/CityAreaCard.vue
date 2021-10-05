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
                <toggle-big-city v-model="bigcityKind" />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="select"
                  :items="items"
                  item-text="yearName"
                  item-value="yearStr"
                  :menu-props="{ top: true, offsetY: true }"
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
      type: Number,
      required: true,
    },
    prefName: {
      type: String,
      required: true,
    },
  },
  async fetch() {
    const url = 'https://geoshape.ex.nii.ac.jp/city/topojson'
    const json = () => {
      if (this.bigcityKind === 'all') {
        return '_city_dc.l.topojson'
      } else {
        return '_city.l.topojson'
      }
    }
    const response = await fetch(
      `${url}/${this.select}/${this.prefCode}/${this.prefCode}${json()}`
    )
    this.topojson = await response.json()
    this.geojson = this._convTopoJsonToGeoJson(this.topojson, 'city')
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
      bigcityKind: 'all',
      select: '20200101',
      items: [
        { yearName: '1920年', yearStr: '19200101' },
        { yearName: '2020年', yearStr: '20200101' },
      ],
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
  },
  watch: {
    bigcityKind() {
      this.$fetch()
    },
    select() {
      this.$fetch()
    },
  },
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
