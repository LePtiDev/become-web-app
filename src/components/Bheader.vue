<template>
  <header class="bg-gray-50">
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
      <div class="sm:justify-between sm:items-center sm:flex">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            {{ title }}
          </h1>

          <p class="mt-1.5 text-sm text-gray-500">{{ subtitle }}</p>
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
    subtitle: String,
  },
});
</script>

<style scoped>

</style>