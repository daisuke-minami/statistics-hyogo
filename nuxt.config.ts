import fs from 'fs'
import { NuxtConfig } from '@nuxt/types'

/*
 **環境変数の設定
 **NuxtConfigのenv: {}に定義すること
 */
const environment = process.env.NODE_ENV || 'development'
// const client = require('./plugins/contentful')
const {
  PREF_CODE,
  API_KEY,
  ESTAT_APPID,
  GOOGLE_ANALYTICS_ID,
  BASE_URL,
  CTF_SPACE_ID,
  CTF_CDA_ACCESS_TOKEN,
} = process.env
require('dotenv').config()
const routes = JSON.parse(fs.readFileSync('assets/json/routes.json'))

const config: NuxtConfig = {
  ssr: true,
  target: 'server',
  // target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
    },
    // script: [
    //   {
    //     'data-ad-client': 'ca-pub-4511811306180988',
    //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    //   },
    // ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://statistics-hyogo.com',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@DAISUKEMINAMI5',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@DAISUKEMINAMI5',
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '713094453013947',
      },
      {
        hid: 'note:card',
        property: 'note:card',
        content: 'summary_large_image',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-precomposed.png' },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.css',
      },
      {
        rel: 'preload',
        as: 'fetch',
        href: 'payload.js',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/composition-api', ssr: true },

    {
      src: '@/plugins/topojson-client',
      ssr: true,
    },
    {
      src: '@/plugins/highcharts-vue',
      mode: 'client',
    },
    {
      src: '@/plugins/resas',
      ssr: true,
    },
    { src: '@/plugins/leaflet', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: false,
      },
    ],
    '@nuxtjs/google-analytics',
    '@nuxtjs/gtm',
    'nuxt-purgecss',
  ],
  typescript: {
    typeCheck: {
      typescript: {
        memoryLimit: 8192,
      },
    },
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    ['@nuxtjs/dotenv', { filename: `.env.${environment}` }],
    'nuxt-svg-loader',
    ['vue-scrollto/nuxt', { duration: 1000, offset: -72 }],
    'nuxt-webfontloader',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-leaflet',
    '@nuxtjs/sitemap',
    // ['@nuxtjs/google-adsense', { id: 'ca-pub-4511811306180988' }],
    // ['@nuxtjs/google-gtag'],
    ['nuxt-canonical', { baseUrl: 'https://statistics-hyogo.com' }],
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://statistics-hyogo.com',
    cacheTime: 1000 * 60 * 30,
    gzip: true,
    generate: false,
    routes() {
      return routes
    },
  },
  highcharts: {},
  axios: {
    retry: { retries: 3 },
    proxy: true,
  },
  proxy: {
    '/json/': {
      target: 'http://api.e-stat.go.jp/rest/3.0/app/json',
      pathRewrite: {
        '^/json/': '/',
      },
    },
    '/api/': {
      target: 'https://opendata.resas-portal.go.jp/api',
      pathRewrite: {
        '^/api/': '/',
      },
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    optionsPath: './plugins/vuetify.options.ts',
    treeShake: true,
    defaultAssets: false,
  },
  /*
   * Webfontloader
   * https://github.com/Developmint/nuxt-webfontloader
   */
  webfontloader: {
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  },
  'google-gtag': {
    id: 'G-0ENS8E4461', // サイトのID
    debug: false, // 開発環境でも表示したい場合
  },
  /*
   ** @nuxtjs/gtm config
   */
  gtm: {
    id: process.env.GTM_CONTAINER_ID,
    pageTracking: true,
    enabled: true,
  },
  build: {
    // vendor: ['@/plugins/highcharts-vue'],
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'autoplace',
        },
      },
    },
    extend(config) {
      config.externals = [{ moment: 'moment' }]
    },
  },
  purgeCSS: {
    paths: [
      './node_modules/vuetify/dist/vuetify.js',
      './node_modules/vue-spinner/src/ScaleLoader.vue',
    ],
    whitelist: ['DataCard', 'GraphLegend'],
    whitelistPatterns: [/(col|row)/],
  },
  manifest: {
    name: '統計で見る兵庫県のすがた',
    theme_color: '#00a040',
    background_color: '#ffffff',
    display: 'standalone',
    Scope: '/',
    start_url: '/',
    splash_pages: null,
  },
  generate: {
    interval: 50,
    crawler: false,
    concurrency: 10,
    routes() {
      return routes
    },
  },
  // /*
  // ** hot read configuration for docker
  // */
  watchers: {
    webpack: {
      poll: true,
    },
  },
  env: {
    PREF_CODE,
    API_KEY,
    ESTAT_APPID,
    GOOGLE_ANALYTICS_ID,
    BASE_URL,
    CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN,
  },
  router: {
    // middleware: 'vuex',
  },
  markdownit: {
    injected: true,
    breaks: true,
  },
  components: [
    {
      path: '@/components/',
      pathPrefix: false,
    },
  ],
}

export default config
