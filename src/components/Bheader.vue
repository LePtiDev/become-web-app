<template>
  <header class="bg-gray-50">
    <div class="px-2 py-6 mx-16 sm:py-10 sm:px-4 lg:px-6">
      <div class="sm:justify-between sm:items-center sm:flex">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            {{ title }}
          </h1>
        </div>

        <div class="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
          <slot name="rightNav"></slot>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
  },
});
</script>

<style scoped>

</style>