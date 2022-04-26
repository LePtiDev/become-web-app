<template>
  <Global v-if="$route.name !== 'home'">
    <router-view />
  </Global>
  <div v-else><router-view /></div>
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
