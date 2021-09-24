<template>
  <v-slider
    v-model="internalValue"
    thumb-label="always"
    class="Slider"
    :max="2045"
    :min="1980"
    step="5"
    hide-details
    @change="$emit('input', $event)"
  />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'DataSelector',
  props: {
    value: {
      type: Number,
      default: 2015,
    },
    targetId: {
      type: String,
      default: (val) => {
        return val && val !== '' ? val : null
      },
    },
  },
  data() {
    return {
      internalValue: '',
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.internalValue = value
      },
    },
  },
})
</script>

<style lang="scss">
.Slider {
  margin-bottom: 20px;
  background-color: $white;
}
</style>
