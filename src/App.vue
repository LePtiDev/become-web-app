<template>
  <v-app class="container-app">
    <navbar v-if="$route.meta.showSideBar" />
    <div :class="getPageClass()">
      <router-view />
    </div>
    <b-snackbar :settings="snackbar" />
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import BSnackbar from "@/components/global/BSnackbar.vue";
import { mapState } from "vuex";
import Navbar from "./components/global/Navbar.vue";

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
  methods: {
    getPageClass() {
      if (this.$route.name == "home") {
        return "container-home-page";
      } else if (this.$route.meta?.showSideBar) {
        return "container-page";
      } else {
        return "container-page-login";
      }
    },
  },
});
</script>
