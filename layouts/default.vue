<template>
  <v-app class="app">
    <!-- <v-overlay :value="loading" color="#F8F9FA" opacity="1" z-index="9999">
      <div class="loader">
        <img src="/logo.svg" alt="兵庫県" />
        <scale-loader color="#01A0C7" />
      </div>
    </v-overlay> -->
    <div v-if="hasNavigation" class="appContainer">
      <div class="naviContainer">
        <side-navigation
          :is-navi-open="isOpenNavigation"
          :class="{ open: isOpenNavigation }"
          @open-navigation="openNavigation"
          @close-navigation="closeNavigation"
        />
      </div>
      <main class="mainContainer" :class="{ open: isOpenNavigation }">
        <v-container class="px-4 py-8">
          <nuxt />
        </v-container>
      </main>
    </div>
    <div v-if="!loading && !hasNavigation" class="embed">
      <v-container>
        <nuxt />
      </v-container>
    </div>
    <no-script />
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRef,
  useMeta,
  useRoute,
  computed,
  provide,
  inject,
} from '@nuxtjs/composition-api'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {
  useGlobalState,
  StateKey,
  GlobalState,
} from '@/composition/useGlobalState'

type LocalData = {
  hasNavigation: boolean
  isOpenNavigation: boolean
  loading: boolean
}

export default defineComponent({
  components: {
    ScaleLoader,
  },
  head: {},
  setup() {
    // provide
    provide(StateKey, useGlobalState())
    const { setInitState } = inject(StateKey) as GlobalState
    setInitState()

    const data = reactive<LocalData>({
      hasNavigation: true,
      isOpenNavigation: false,
      loading: true,
    })

    // URLパラメータの取得
    const route = useRoute()
    const query = computed(() => route.value.query)
    const path = computed(() => route.value.path)

    onMounted(() => {
      data.loading = false
      getMatchMedia().addListener(closeNavigation)
      if (query.value.embed === 'true') {
        data.hasNavigation = false
        // data.loading = false
      } else if (query.value.ogp === 'true') {
        data.hasNavigation = false
        // data.loading = false
      }
    })

    onBeforeUnmount(() => {
      getMatchMedia().removeListener(closeNavigation)
    })

    const openNavigation = () => {
      data.isOpenNavigation = true
    }

    const closeNavigation = () => {
      data.isOpenNavigation = false
    }

    const getMatchMedia = () => {
      return window.matchMedia('(min-width: 601px)')
    }

    const mInfo = reactive<any>({
      title: '統計で見る兵庫県のすがた',
      titleTemplate: `%s | 統計で見る兵庫県のすがた`,
      link: [
        {
          rel: 'canonical',
          href: `https://statistice-hyogo.com${path.value}`,
        },
      ],
      meta: [
        {
          hid: 'author',
          name: 'author',
          content: 'DAISUME MINAMI',
        },
        {
          hid: 'description',
          name: 'description',
          content: `当サイトは、兵庫県に関する統計をわかりやすく伝えることを目的として、いち兵庫県民が開設したサイトです。`,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: `統計で見る兵庫県のすがた`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://statistice-hyogo.com${path.value}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `統計で見る兵庫県のすがた`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `当サイトは、兵庫県に関する統計をわかりやすく伝えることを目的として、いち兵庫県民が開設したサイトです。`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://statistice-hyogo.com/ogp.png`,
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: `統計で見る兵庫県のすがた`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://statistice-hyogo.com/ogp.png`,
        },
      ],
    })

    const { title, titleTemplate, meta, link } = useMeta()
    title.value = mInfo.title
    titleTemplate.value = mInfo.titleTemplate
    meta.value = mInfo.meta
    link.value = mInfo.link

    return {
      hasNavigation: toRef(data, 'hasNavigation'),
      isOpenNavigation: toRef(data, 'isOpenNavigation'),
      loading: toRef(data, 'loading'),
      openNavigation,
      closeNavigation,
      getMatchMedia,
    }
  },
})
</script>

<style lang="scss" scoped>
.app {
  max-width: 1440px;
  margin: 0 auto;
  background-color: inherit !important;
}
.v-application--wrap {
  width: 100%;
}
.embed {
  .container {
    padding: 0 !important;
  }
  .DataCard {
    padding: 0 !important;
  }
}
.appContainer {
  position: relative;
  @include largerThan($small) {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: auto;
  }
  @include largerThan($huge) {
    grid-template-columns: 325px 1fr;
    grid-template-rows: auto;
  }
}
.naviContainer {
  background-color: $white;
}
@include lessThan($small) {
  .naviContainer {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: z-index-of(sp-navigation);
  }
}
@include largerThan($small) {
  .naviContainer {
    grid-column: 1/2;
    position: fixed;
    top: 0;
    overflow-y: auto;
    width: 240px;
    height: 100%;
    border-right: 1px solid $gray-4;
    border-left: 1px solid $gray-4;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    overscroll-behavior: contain;
  }
}
@include largerThan($huge) {
  .naviContainer {
    width: 325px;
  }
}
.open {
  height: 100vh;
  @include largerThan($small) {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.mainContainer {
  grid-column: 2/3;
  overflow: hidden;
  @include lessThan($small) {
    .container {
      padding-top: 16px;
    }
  }
}
.loader {
  height: 200px;
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  img {
    display: block;
    margin: 0 auto 20px;
  }
}
</style>
