<template>
  <div>
    <div class="myc-input-switch">
      <input type="checkbox" ref="switch" :checked="value" @input="change($event.target)" :disabled="disabled" />
      <label @click="change()">Toggle</label>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    manageClick: {
      default: false,
    },
    value: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    change() {
      if (!this.manageClick) {
        let localValue: any = this.$refs?.["switch"] as HTMLInputElement;
        this.$emit("input", !localValue.checked);
      }
    },
  },
});
</script>
