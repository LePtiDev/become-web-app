<template>
  <div @click="click()" :class="getClass()" class="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium cursor-pointer">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "b-button",
  props: {
    type: {
      type: String,
      default: "primary",
    },
  },
  methods: {
    getClass() {
      if (this.type === "primary") {
        return "bg-orange-400 hover:bg-orange-500 border-transparent text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500";
      } else if (this.type === "secondary") {
        return "border-gray-300  bg-white text-gray-500 hover:bg-gray-50";
      }
    },
    click() {
      this.$emit("click");
    },
  },
});
</script>
