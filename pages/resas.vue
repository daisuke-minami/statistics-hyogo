<template>
  <div class="Parent">
    <page-header class="mb-3"> RESAS-APIの使い方 </page-header>

    <static-card>
      <h3>RESAS-APIの概要</h3>
      <h4>RESASとは</h4>
      <p>
        RESASとは、日本・内閣府のまち・ひと・しごと創生本部が運用している、産業構造や人口動態、人の流れなどに関する官民のいわゆるビッグデータを集約し、可視化を試みるシステムです。
      </p>
      <ul>
        <li>
          <app-link to="https://resas.go.jp/#/13/13101" :icon-size="16">
            地域経済分析システムRESAS
          </app-link>
        </li>
      </ul>
      <h4>RESAS-APIとは</h4>
      <p>
        地域経済分析システムRESASに搭載されている公的データについて、機械判読可能で、加工しやすい形式で取得できるAPI機能を提供しています。
      </p>
      <ul>
        <li>
          <app-link
            to="https://opendata.resas-portal.go.jp/docs/api/v1/index.html"
            :icon-size="16"
          >
            RESAS-API > API概要
          </app-link>
        </li>
      </ul>
      <h4>RESAS-APIの利用方法</h4>
      <p>
        RESAS-APIを利用するためには、利用者登録してAPI_KEYを取得する必要があります。詳しくは下記サイトを参照してください。
      </p>
      <ul>
        <li>
          <app-link
            to="https://www.idearu.info/article/data/ds1355"
            :icon-size="16"
          >
            APIから政府オープンデータを活用する
          </app-link>
        </li>
      </ul>
      <h4>Nuxt.jsで利用する準備</h4>
      <p>
        取得したAPI_KEYを環境変数として利用するために、.envファイルにAPI_KEYを設定します。
      </p>
      <ssh-pre label=".env"> API_KEY='ここにAPI_KEYを記載' </ssh-pre>
    </static-card>
    <static-card>
      <h3>RESAS-APIのデータを取得</h3>
      <h4>API-KEYの設定</h4>
      <ul>
        <li>{{ '各保健所にご相談ください' }}</li>
        <li>
          {{ '各保健所の電話番号について' }}
          <br />
          <app-link
            to="https://www.fukushihoken.metro.tokyo.lg.jp/iryo/kansen/coronasodan.html"
            :icon-size="16"
            >{{ '「新型コロナウイルス感染症にかかる相談窓口について」' }}
          </app-link>
        </li>
      </ul>
    </static-card>
    <static-card>
      <h3>Vuexで利用する場合</h3>
      <p>
        Vuexを利用してRASAS-APIの兵庫県市区町村データを管理する場合は、store/index.jsでstate及びactions,mutations,gettersを設定します。
      </p>
      <h4>state</h4>
      <ssh-pre language="js" label="store/index.js">
        import { cloneDeep } from 'lodash' const initialState = { citySet: [], }
        // ShallowCopyを避けるため、lodashのcloneDeepを用いる。 export const
        state = () => cloneDeep(initialState)
      </ssh-pre>
      <h4>getters</h4>
      <ssh-pre language="js" label="store/index.js">
        export const getters = { getCitySet(state) { return state.citySet }, },
      </ssh-pre>
      <h4>mutations</h4>
      <ssh-pre language="js" label="store/index.js">
        export const mutations = { initCitySet(state, payload) { if (payload ===
        null) { state = cloneDeep(initialState) } else { state.citySet = payload
        } }, },
      </ssh-pre>
      <h4>actions</h4>
      <ssh-pre language="js" label="store/index.js">
        import axios from 'axios' export const actions = { async fetchCities({
        commit }) { const res = await
        axios.get('https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=28',
        { headers: { 'X-API-KEY': process.env.API_KEY, }, } ) if
        (res.data.result) commit('initCitySet', res.data.result) }, }
      </ssh-pre>
    </static-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
  head(): MetaInfo {
    return {
      title: 'RESAS-APIの使い方' as string,
    }
  },
})
</script>
