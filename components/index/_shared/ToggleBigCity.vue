<template>
  <v-btn-toggle v-model="value" class="DataSelector" mandatory>
    <v-btn
      v-ripple="false"
      :aria-pressed="value === 'join' ? 'true' : 'false'"
      value="join"
      class="DataSelector-Button"
    >
      政令市統合
    </v-btn>
    <v-btn
      v-ripple="false"
      :aria-pressed="value === 'split' ? 'true' : 'false'"
      value="split"
      class="DataSelector-Button"
    >
      政令市分割
    </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@nuxtjs/composition-api'
import { BigCityKind, useBigCity } from '@/composition/useBigCity'

export default defineComponent({
  setup() {
    const { bigCityKind } = useBigCity()
    const value = ref<Ref<BigCityKind>>(bigCityKind)
    return { value }
  },
})
</script>

<style lang="scss" scoped>
.DataSelector {
  margin-top: -10px;
  border: 1px solid $gray-4;
  background-color: $white;

  &-Button {
    border: none !important;
    margin: 2px;
    border-radius: 4px !important;
    height: 24px !important;
    color: $gray-1 !important;
    background-color: $white !important;
    @include font-size(12, true);

    &::before {
      background-color: inherit;
    }

    &:focus {
      outline: dotted $gray-3 1px;
    }
  }

  & .v-btn--active {
    background-color: $gray-2 !important;
    color: $white !important;
  }
}
</style>
