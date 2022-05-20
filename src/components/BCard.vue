<template>
  <div class="bg-white overflow-hidden shadow rounded-lg w-72">
    <img :src="image" alt="node js and mongo DB" class="w-full"/>
    <div v-if="title" class="px-4 pt-5 sm:px-6 justify-between">
      <h2 class="text-lg font-bold text-gray-900">{{ title }}</h2>
      <p class="pb-3">{{ teacher }}</p>
      <slot name="header-right" />
    </div>
    <div class="px-4">

    </div>
    <!-- Remplacer par une div avec des boutons -->
    <slot name="footer" class="px-4 py-4 sm:px-6" />
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
});
</script>
