<template>
  <div class="LanguageSelector">
    <div class="LanguageSelector-Background">
      <earth-icon class="EarthIcon" aria-hidden="true" />
      <select-menu-icon class="SelectMenuIcon" aria-hidden="true" />
    </div>
    <select
      id="LanguageSelector"
      v-model="selectedPref"
      class="LanguageSelector-Menu"
    >
      <option
        v-for="item in prefList"
        :key="item.prefCode"
        :value="item"
        :title="`Switch to ${item.prefName}`"
      >
        {{ item.prefName }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from '@nuxtjs/composition-api'
import EarthIcon from '@/static/earth.svg'
import SelectMenuIcon from '@/static/selectmenu.svg'
import { convertPrefCodeToCode } from '@/composition/utils/formatResas'
import { GlobalState, StateKey } from '~/composition/useGlobalState'
import { Pref } from '~/types/resas'
import { useChangeRouter } from '~/composition/useChangeRouter'

type LocalData = {
  currentLocaleCode: string
}

export default defineComponent({
  components: {
    EarthIcon,
    SelectMenuIcon,
  },
  setup() {
    // globalState
    const { currentPref, setPrefecture, getCurrentPrefList } = inject(
      StateKey
    ) as GlobalState

    // 市区町村リストの設定
    const prefList = getCurrentPrefList()
    const selectedPref = ref<Pref>(currentPref)

    watch(selectedPref, () => changePref())
    const { changeRoute } = useChangeRouter()
    const changePref = () => {
      const code = convertPrefCodeToCode(selectedPref.value.prefCode)
      setPrefecture(code)
      changeRoute(code)
    }

    return {
      prefList,
      selectedPref,
    }
  },
})
</script>

<style lang="scss" scoped>
.LanguageSelector {
  position: relative;
}

.LanguageSelector-Background {
  display: flex;
  align-items: center;
  padding: 0 6px;
  border-radius: 4px;
  height: 28px;

  .EarthIcon {
    order: -1;
  }

  .SelectMenuIcon {
    margin-left: auto;
  }

  // &::before {
  //   content: '選択:';
  //   margin-left: 4px;
  //   color: $gray-1;

  //   @include font-size(12);

  //   @include lessThan($small) {
  //     @include font-size(16);
  //   }
  // }
}

.LanguageSelector-Menu {
  // select 要素のリセット
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  // IEで矢印ボタンを消す
  &::-ms-expand {
    display: none;
  }

  border: 1px solid $gray-4;

  // 背景に被せて位置など調整
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 25px;
  width: 100%;
  height: 28px;
  line-height: 28px;

  @include font-size(12);

  &:focus {
    border: 2px solid;
    outline: none;
  }

  @include lessThan($small) {
    padding-left: 70px;

    @include font-size(16);
  }
}
</style>
