<template>
  <div class="About">
    <page-header class="mb-3"> 当サイトについて </page-header>
    <static-card>
      当サイトは兵庫県に在住する個人が開設したもので、兵庫県公式とは全く関係ありませんのでご注意ください。<br />
      <br />
      公表されている情報と客観的な数値をわかりやすく伝えることで、兵庫県のすがたをより多くの方に知ってもらうことを目的としています。
    </static-card>
    <static-card>
      <h3>ブラウザ環境について</h3>
      <p>当サイトは以下の環境でご覧いただくことを推奨いたします。</p>
      <ul>
        <li>Microsoft Edge 最新版</li>
        <li>Mozilla Firefox 最新版</li>
        <li>Google Chrome 最新版（Windows 10以上, Android 8.0以上）</li>
        <li>Safari 最新版（macOS, iOS）</li>
        <li>Opera 最新版</li>
      </ul>
      <p class="StaticCard-Note">
        <span>※</span>
        <span>
          推奨環境以外で利用された場合や、推奨環境下でもご利用のブラウザの設定等によっては、正しく表示されない場合がありますのでご了承ください。
        </span>
      </p>
    </static-card>
    <static-card>
      <h3>当サイトへのリンクについて</h3>
      <p>当サイトへのリンクは自由です。</p>
    </static-card>
    <static-card>
      <h3>JavaScriptについて</h3>
      <p>
        当サイトではJavaScriptを使用しております。<br />
        JavaScriptを無効にして使用された場合、各ページが正常に動作しない、または、表示されない場合がございます。<br />
        当サイトをご利用の際には、JavaScriptを有効にして頂きますようお願いいたします。
      </p>
    </static-card>
    <static-card>
      <h3>クッキー (Cookie) について</h3>
      <p>
        当サイトの一部ではクッキーを使用しています。<br />
        クッキーとは、Webコンテンツからの要求で利用者の手元の端末に一時的に保存されるデータのことで、当サイトでは利用状況の把握のためにクッキーを使用する場合があります。<br />
      </p>
      <p>
        ブラウザに関する情報の収集を希望しない場合は、インターネット閲覧ソフト（ブラウザ）をご自身で設定することにより、クッキーの機能が働かないようにすることも可能です。
      </p>
      <p>
        ただし、クッキーを受け入れない設定をされている場合は、当サイトの機能が正常に動作しない場合がございます。
      </p>
    </static-card>
    <static-card>
      <h3>Google Analyticsの利用について</h3>
      <p>
        当サイトでは、サービス向上やサイトの改善のためにGoogleLLCの提供するアクセス分析のツールであるGoogleAnalyticsを利用した計測を行っております。
      </p>
      <p>
        Google Analyticsでは、当サイトが発行するクッキー (Cookie)
        等を利用して、Webサイトの利用データ（アクセス状況、トラフィック、閲覧環境、IPアドレスなど）を収集しております。クッキーの利用に関してはGoogleのプライバシーポリシーと規約に基づいております。
      </p>
      <p>
        取得したデータはWebサイト利用状況を分析しサービスの改善につなげるため、またはサイト運営者へのレポートを作成するため、その他のサービスの提供に関わる目的に限り、これを使用します。（サイト運営者へのレポートでは、クッキーはブラウザ単位で本サイトのユーザー数をカウントするため、IPアドレスはGoogle
        Analyticsの分析機能を通じてアクセス元の地域分布（国、州・都道府県、都市）を把握するために利用されています。）
      </p>
      <p>
        GoogleAnalyticsの利用規約及びプライバシーポリシーに関する説明については、GoogleAnalyticsのサイトをご覧ください。
      </p>
      <ul>
        <li>
          <app-link
            :to="'https://marketingplatform.google.com/about/analytics/terms/jp/'"
            :icon-size="16"
          >
            GoogleAnalytics利用規約
          </app-link>
        </li>
        <li>
          <app-link
            :to="'https://policies.google.com/privacy?hl=ja'"
            :icon-size="16"
          >
            Googleのプライバシーポリシー
          </app-link>
        </li>
        <li>
          <app-link
            :to="'https://support.google.com/analytics/answer/6004245?hl=ja'"
            :icon-size="16"
          >
            Google Analyticsに関する詳細情報
          </app-link>
        </li>
      </ul>
      <p>
        Google Analyticsによる情報送信を回避する場合は、Google
        がサポートするアドオンをご利用ください。
      </p>
      <ul>
        <li>
          <app-link
            :to="'https://tools.google.com/dlpage/gaoptout?hl=ja'"
            :icon-size="16"
          >
            測定を無効にするブラウザ アドオン
          </app-link>
        </li>
      </ul>
    </static-card>
    <static-card>
      <h3>免責事項</h3>
      <p>
        当サイトに掲載されている情報の正確性については万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。
      </p>
      <p>
        また、利用者が当サイトを利用したことにより発生した利用者の損害及び利用者が第三者に与えた損害に対して、責任を負うものではありません。
      </p>
      <p>
        当サイトに掲載されている情報は、予告なしに変更又は削除することがあります。
      </p>
    </static-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

import AppLink from '@/components/AppLink.vue'
import PageHeader from '@/components/PageHeader.vue'
import StaticCard from '@/components/StaticCard.vue'

export default Vue.extend({
  components: {
    PageHeader,
    StaticCard,
    AppLink,
  },
  head(): MetaInfo {
    return {
      title: '当サイトについて' as string,
    }
  },
})
</script>
