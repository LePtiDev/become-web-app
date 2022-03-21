<template>
  <v-app class="container-app">
    <navbar v-if="checkRouteForNavBar" />
    <div
      :class="checkRouteForContainer"
      class=""
    >
      <router-view />
    </div>
    <b-snackbar :settings="snackbar" />
  </v-app>
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
    checkRouteForNavBar(): boolean {
      const routes: Array<string> = ['home', 'login', 'signup']
      const currentRoute: any = this.$route.name
      const check: Array<boolean> = routes.map(route => route === currentRoute)
      let value: boolean = true
      if (check) value = false
      return value
    },
    checkRouteForContainer(): string {
      return this.$route.name != '' ? 'container-page-login' : 'container-page'
    }
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
