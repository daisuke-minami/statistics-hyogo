<template>
  <div>
    <static-card>
      <v-select
        v-model="innerSelectedCity"
        :items="cityList"
        item-text="cityName"
        item-value="cityCode"
        return-object
      />
    </static-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  useRouter,
  ref,
  watch,
} from '@nuxtjs/composition-api'

import { useCityList } from '@/composition/useCityList'
import { City } from '@/types/resas'

export default defineComponent({
  setup() {
    // パスパラメータの取得
    const route = useRoute()
    const { statField, menuTitleId } = route.value.params

    // 市区町村一覧の取得
    const cityList = useCityList().getCityList.value

    // 選択した市区町村へ移動
    const router = useRouter()
    const innerSelectedCity = ref<City>({
      prefCode: 28,
      cityCode: '28100',
      cityName: '神戸市',
      bigCityFlag: '2',
    })
    watch(innerSelectedCity, () => {
      const code = innerSelectedCity.value.cityCode
      router.push(`/${code}/${statField}/${menuTitleId}`)
    })

    return {
      cityList,
      innerSelectedCity,
    }
  },
})
</script>

<style scoped lang="scss">
.v-slide-group__content {
  border-bottom: 1px solid $gray-2;
  background: $gray-5;
}

.v-tab {
  top: 1px;
  margin: 0 8px;
  border-style: solid;
  border-radius: 4px 4px 0 0;
  font-weight: bold !important;
  @include font-size(16, true);

  &:focus {
    outline: dotted $gray-3 1px;
  }

  &--active {
    color: $gray-2 !important;
    background: $gray-5;
    border-color: $gray-2 $gray-2 $gray-5 $gray-2;
    border-width: 1px 1px 2px 1px;
    &::before {
      background-color: transparent;
    }
  }

  &:not(.v-tab--active) {
    color: $blue-1 !important;
    background: $white;
    border-color: $blue-1 $blue-1 $gray-2 $blue-1;
    border-width: 1px;
    &:hover {
      color: $white !important;
      background: $blue-1;
    }
    .TabIcon {
      color: inherit !important;
    }
  }
}

.v-tabs-items {
  background-color: transparent !important;
}

@function px2vw($px, $vw: 768) {
  @return $px / $vw * 100vw;
}

@include lessThan($medium) {
  .v-slide-group__content {
    width: 100%;
  }
  .v-tab {
    font-size: px2vw(16) !important;
    font-weight: normal !important;
    flex: 1 1 auto;
    width: 100%;
    padding: 0 8px !important;
  }
}

@include lessThan($small) {
  .v-tab {
    font-size: px2vw(20, 600) !important;
    padding: 0 4px !important;
  }
  .TabIcon {
    font-size: px2vw(24, 600) !important;
  }
}
</style>
