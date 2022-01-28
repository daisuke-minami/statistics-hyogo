<template>
  <v-btn-toggle
    :value="value"
    class="DataSelector"
    mandatory
    @change="$emit('input', $event)"
  >
    <v-btn
      v-ripple="false"
      :aria-pressed="value === 'map' ? 'true' : 'false'"
      value="map"
      class="DataSelector-Button"
    >
      MAP
    </v-btn>
    <v-btn
      v-ripple="false"
      :aria-pressed="value === 'bar' ? 'true' : 'false'"
      value="bar"
      class="DataSelector-Button"
    >
      BAR
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: 'map',
    },
  },
  data() {
    return {
      canvas: true,
    }
  },
})
</script>

<style lang="scss" scoped>
.DataSelector {
  // margin-top: 10px;
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
