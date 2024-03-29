<template>
  <div>
    <v-tabs>
      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :to="{ path: item.path }"
        nuxt
        exact
      >
        {{ item.label }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { EventBus, TOGGLE_EVENT } from '@/utils/tab-event-bus'
import { useChangeRouter } from '~/composition/useChangeRouter'

export default defineComponent({
  setup() {
    const { getGovTabLink } = useChangeRouter()
    const items = computed(() => {
      return [
        {
          label: `都道府県の統計`,
          govType: 'prefecture',
          path: getGovTabLink.value('prefecture'),
        },
        {
          label: `市区町村の統計`,
          govType: 'city',
          path: getGovTabLink.value('city'),
        },
      ]
    })

    const change = (): void => {
      EventBus.$emit(TOGGLE_EVENT)
    }

    return {
      items,
      change,
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
