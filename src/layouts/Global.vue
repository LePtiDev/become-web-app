<template>
  <div class="min-h-full">
    <nav class="navbar">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center text-orange-400">BECOME</div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="#"
              class="hover:border-orange-200 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="$route.name === 'home' ? 'border-orange-400 text-gray-900' : 'border-transparent text-gray-500'"
              @click="goTo('home')"
            >
              Accueil
            </a>
            <a
              href="#"
              class="hover:border-orange-200 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="$route.name === 'courses' ? 'border-orange-400 text-gray-900' : 'border-transparent text-gray-500'"
              @click="goTo('courses')"
            >
              Cours
            </a>
          </div>
        </div>
        <div class="">
          <div class="ml-3 relative"></div>
        </div>
      </div>
    </nav>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    goTo(to: string) {
      this.$router.push({ name: to });
    },
  },
});
</script>
