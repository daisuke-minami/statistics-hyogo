<template>
  <div ref="Side" class="SideNavigation" tabindex="-1">
    <header class="SideNavigation-Header">
      <v-icon
        class="SideNavigation-OpenIcon"
        :aria-label="'サイドメニュー項目を開く'"
        @click="$emit('open-navigation', $event)"
      >
        {{ mdiMenu }}
      </v-icon>
      <h1 class="SideNavigation-HeaderTitle">
        <app-link :to="'/'" class="SideNavigation-HeaderLink">
          <img
            class="SideNavigation-HeaderLogo"
            src="/logo.svg"
            width="111"
            height="28"
            :alt="'兵庫県'"
          />
          <div class="SideNavigation-HeaderText">統計で見る兵庫県のすがた</div>
        </app-link>
      </h1>
    </header>

    <div :class="['SideNavigation-Body', { '-opened': isNaviOpen }]">
      <nav class="SideNavigation-Menu">
        <div class="SideNavigation-Language">
          <label
            ref="LanguageLabel"
            class="SideNavigation-LanguageLabel"
            for="LanguageSelector"
            tabindex="-1"
          >
            {{ '都道府県を選択' }}
          </label>
          <language-selector />
        </div>
        <menu-list :items="items" @click="$emit('close-navigation', $event)" />
      </nav>

      <v-icon
        class="SideNavigation-CloseIcon"
        :aria-label="'サイドメニュー項目を閉じる'"
        @click="$emit('close-navigation', $event)"
      >
        {{ mdiClose }}
      </v-icon>

      <footer class="SideNavigation-Footer">
        <div class="SideNavigation-Social">
          <app-link
            to="https://line.me/ti/p/XBYGyO82kV"
            :show-icon="false"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/line.webp" type="image/webp" />
              <img src="/line.png" width="130" height="130" alt="LINE" />
            </picture>
          </app-link>
          <app-link
            to="https://twitter.com/DAISUKEMINAMI5"
            :show-icon="false"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/twitter.webp" type="image/webp" />
              <img src="/twitter.png" width="130" height="130" alt="Twitter" />
            </picture>
          </app-link>
          <app-link
            to="https://www.facebook.com/daisuke.minami.98837"
            :show-icon="false"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/facebook.webp" type="image/webp" />
              <img
                src="/facebook.png"
                width="130"
                height="130"
                alt="Facebook"
              />
            </picture>
          </app-link>
          <app-link
            to="https://github.com/daisuke-minami/statistics-hyogo"
            :show-icon="false"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/github.webp" type="image/webp" />
              <img src="/github.png" width="130" height="130" alt="GitHub" />
            </picture>
          </app-link>
          <!-- <app-link
            to="https://www.youtube.com/user/tokyo/videos"
            :show-icon="false"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/youtube.webp" type="image/webp" />
              <img src="/youtube.png" width="130" height="130" alt="YouTube" />
            </picture>
          </app-link> -->
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { mdiClose, mdiMenu } from '@mdi/js'
import { useSideNavi } from '~/composition/useSideNavi'

export default defineComponent({
  props: {
    isNaviOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const items = computed(() => {
      return useSideNavi().naviItems.value
    })

    return {
      items,
      mdiClose,
      mdiMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  @include lessThan($small) {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  }
  &:focus {
    outline: 1px dotted $gray-3;
  }
}

.SideNavigation-Header {
  height: 64px;
  padding-left: 52px;
  @include largerThan($small) {
    height: auto;
    padding: 20px;
  }
  @include lessThan($small) {
    display: flex;
  }
  @include lessThan($tiny) {
    padding-left: 44px;
  }
}

.SideNavigation-OpenIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-CloseIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-HeaderTitle {
  width: 100%;
  color: #707070;
  @include font-size(13);
  @include largerThan($small) {
    margin: 0;
    margin-top: 10px;
  }
}

.SideNavigation-HeaderLink {
  display: flex;
  align-items: center;
  padding-right: 10px;
  @include lessThan($small) {
    height: 64px;
  }
  @include lessThan($tiny) {
    justify-content: space-between;
  }
  &:link,
  &:hover,
  &:focus,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }

  &:hover,
  &:focus {
    font-weight: bold;
  }

  &:focus {
    outline: dotted $gray-3 1px;
  }

  @include largerThan($small) {
    display: block;
    padding: 15px 0;
  }
}

.SideNavigation-HeaderLogo {
  @include lessThan($tiny) {
    width: 100px;
  }
}

.SideNavigation-HeaderText {
  margin: 10px 0 0 0;
  @include lessThan($small) {
    margin: 0 0 0 10px;
  }

  @include lessThan($tiny) {
    margin: 0;
  }
}

.SideNavigation-Body {
  padding: 0 20px 20px;
  @include lessThan($small) {
    display: none;
    padding: 0 36px 36px;
    &.-opened {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      display: block !important;
      width: 100%;
      z-index: z-index-of(opened-side-navigation);
      background-color: $white;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
}

.SideNavigation-Menu {
  @include lessThan($small) {
    padding-top: 50px;
  }
}

.SideNavigation-LanguageLabel {
  display: block;
  margin-bottom: 5px;
  @include font-size(14);
}

.SideNavigation-Footer {
  padding-top: 20px;
}

.SideNavigation-Social {
  display: flex;
}

.SideNavigation-SocialLink {
  border: 1px dotted transparent;
  border-radius: 30px;
  color: $gray-3;
  margin-bottom: 15px;

  &:link,
  &:hover,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }

  &:focus {
    color: inherit;
    text-decoration: none;
    border: 1px dotted $gray-3;
    outline: none;
  }

  & + & {
    margin-left: 10px;
  }

  img {
    width: 30px;
  }
}

.SideNavigation-Copyright {
  display: inline-block;
  color: $gray-1;
  line-height: 1.3;
  font-weight: bold;
  @include font-size(10);
}

.SideNavigation-LicenseLink {
  &:focus {
    outline: 1px dotted $gray-3;
  }
}
</style>
