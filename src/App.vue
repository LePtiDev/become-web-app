<template>
  <Global class="bg-gray-100" v-if="$route.meta.layout">
    <router-view />
  </Global>
  <router-view v-else />
</template>
<script lang="ts">
import Vue from "vue";

import Global from "./layouts/Global.vue";

export default Vue.extend({
  components: {
    Global,
  },
});
</script>
