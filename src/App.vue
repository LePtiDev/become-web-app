<template>
  <div class="container-app">
    <navbar v-if="this.$route.name != 'login'" />
    <div
      :class="
        this.$route.name == 'login' ? 'container-page-login' : 'container-page'
      "
      class=""
    >
      <router-view />
    </div>
    <b-snackbar :settings="snackbar" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BSnackbar from "@/components/BSnackbar.vue";
import { mapState } from "vuex";
import Navbar from "./components/Navbar.vue";

export default Vue.extend({
  components: {
    BSnackbar,
    Navbar,
  },
  computed: {
    ...mapState("snackbar", ["snackbar"]),
  },
  created() {
    if (!this.$supabase.auth) {
      this.$router.push({ name: "login" });
    }
  },
  data() {
    return {
      message: "hello toi",
    };
  },
});
</script>
