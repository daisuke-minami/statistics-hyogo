<template>
  <div class="Parent">
    <page-header class="mb-3"> RESAS-APIの使い方 </page-header>

    <static-card>
      <h3>RESAS-APIの概要</h3>
      <h4>RESASとは</h4>
      <p>
        RESASとは、日本・内閣府のまち・ひと・しごと創生本部が運用している、産業構造や人口動態、人の流れなどに関する官民のいわゆるビッグデータを集約し、可視化を試みるシステム。
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
        地域経済分析システムRESASに搭載されている公的データについて、機械判読可能で、加工しやすい形式で取得できるAPI機能を提供している。
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
        <app-link to="https://opendata.resas-portal.go.jp/" :icon-size="16">
          公式サイト </app-link
        >から利用者登録を完了する
      </p>
      <h4>Nuxt.jsで利用する準備</h4>
      <p>
        ログインして
        <app-link
          to="https://opendata.resas-portal.go.jp/mypage.html"
          :icon-size="16"
        >
          [マイページ] </app-link
        >にアクセスすると、一番下に**APIキー**が表示されているのでメモ。
      </p>
    </static-card>
    <static-card>
      <h3>RESAS-APIのデータを取得</h3>
      <h4>API-KEYの設定</h4>
      <p>
        Nuxtプロジェクト直下に.envファイルを作成して、取得したAPIキーを**RESAS_API_KEY**として記載。
      </p>
      <pre>
        <code v-highlight class="javascript">RESAS_API_KEY = '○○○○○○○○○○○○○○○○○'</code>
      </pre>

      <p>nuxt.config.jsに**publicRuntimeConfig**を定義する。</p>

      <pre>
        <code v-highlight class="javascript">publicRuntimeConfig: { RESAS_API_KEY: process.env.RESAS_API_KEY, },</code>
      </pre>

      <p>
        環境変数は$configのグローバルに定義されるので、どこからでも呼び出し可能。
      </p>
      <p>
        GitHubActionsでビルドする場合、プロジェクト内で設定した.envは反映されないので、別途設定する必要がある。
      </p>
      <p>
        詳しくは<app-link
          to="https://lg-note.com/resas/nuxt-resas-axios/"
          :icon-size="16"
        >
          こちらの記事 </app-link
        >を参照。
      </p>

      <h4>nuxtjs/axiosのインストールと設定</h4>

      <p>nuxtjs/axiosをインストール</p>

      <pre>
        <code v-highlight class="javascript">yarn add @nuxtjs/axios,</code>
      </pre>
      <p>nuxt.config.jsで有効化</p>

      <pre>
        <code v-highlight class="javascript">modules: ["@nuxtjs/axios",],</code>
      </pre>
    </static-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useMeta } from '@nuxtjs/composition-api'
import Prism from '@/plugins/prism'

export default defineComponent({
  head: {},
  setup() {
    onMounted(() => {
      Prism.highlightAll()
    })

    const { title } = useMeta()
    title.value = 'RESAS-APIの使い方'

    const content = '# 見出し1  ## 見出し２'

    return {
      content,
    }
  },
})
</script>
