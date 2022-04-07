<template>
  <v-app>
    <div class="container-app">
      <navbar />
      <div :class="getPageClass()">
        <router-view />
      </div>
      <b-snackbar :settings="snackbar" />
    </div>
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
      if (this.$route.name == "sign-in" || this.$route.name == "sign-up") {
        return "container-login";
      } else {
        return "container-page";
      }
    },
  },
});
</script>
