<template>
  <div class="bg-white overflow-hidden shadow rounded-lg" @click="cardClicked">
    <img v-if="image" class="" :src="image" alt="course">
    <div v-if="title" class="px-4 pt-4 sm:px-6 flex justify-between">
      <h2 class="text-lg font-bold text-gray-900">{{ title }}</h2>
      <slot name="header-right" />
    </div>
    <div class="px-4 py-4">
      <slot />
    </div>
    <!-- Remplacer par une div avec des boutons -->
    <slot name="footer" class="px-4 py-4" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    teacher: String,
    image: String,
  },
  methods: {
    cardClicked() {
      this.$emit("clicked");
    }
  }
});
</script>
