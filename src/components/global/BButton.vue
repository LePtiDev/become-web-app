<template>
  <div
    v-if="stopPropagation"
    :class="
      small ? 'button-' + type + '--small' : 'button-' + type + '--regular'
    "
    @click.stop="click"
  >
    <v-icon v-if="iconsLeft && !isLoading" class="icon-left">{{
      iconsLeft
    }}</v-icon>
    <span v-if="title && !isLoading">{{ title }}</span>
    <v-icon v-if="iconsRight && !isLoading" class="icon-right">{{
      iconsRight
    }}</v-icon>
    <v-icon v-if="icon && !isLoading" class="icon">{{ icon }}</v-icon>
  </div>
  <div
    v-else
    :class="
      small ? 'button-' + type + '--small' : 'button-' + type + '--regular'
    "
    @click="click"
  >
    <v-icon v-if="iconsLeft && !isLoading" class="icon-left">{{
      iconsLeft
    }}</v-icon>
    <div v-if="isLoading" class="loading">
      <div></div>
    </div>
    <span v-if="title">{{ title }}</span>
    <v-icon v-if="iconsRight" class="icon-right">{{ iconsRight }}</v-icon>
    <v-icon v-if="icon" class="icon">{{ icon }}</v-icon>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "b-button",
  props: {
    title: String,
    small: Boolean,
    icon: String,
    iconsLeft: String,
    iconsRight: String,
    type: {
      default: "primary",
    },
    finished: Boolean,
    stopPropagation: Boolean,
    isLoading: Boolean,
  },
  data() {
    return {
      started: false,
      loading: false,
    };
  },
  methods: {
    click() {
      if (!this.isLoading) {
        if (!this.loading && this.type !== "disable") {
          this.loading = true;
          this.$emit("click");
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }
    },
  },
});
</script>
