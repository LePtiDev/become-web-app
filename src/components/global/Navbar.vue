<template>
  <nav class="container-navbar" :class="showNav ? 'nav-show-mobile' : ''" :style="windowHeight">
    <div class="container-top-nav">
      <div class="container-nav-logo">
        <div class="logo-become" @click="goTo('home')"></div>
      </div>
      <div class="container-all-link">
        <div :class="$route.meta.type == 'dashboard' ? 'link-active nav-link' : 'nav-link'" @click="goTo('dashboard')">
          <v-icon>mdi-chart-box-outline</v-icon>
          <span class="link-name">Dashboard</span>
        </div>
        <div v-if="user_data.role === 'SUPER_ADMIN' || user_data.role === 'ADMIN'" :class="$route.meta.type == 'user' ? 'link-active nav-link' : 'nav-link'" @click="goTo('users')">
          <v-icon>mdi-account-multiple-outline</v-icon>
          <span class="link-name">Utilisateurs</span>
        </div>
        <div :class="$route.meta.type == 'course' ? 'link-active nav-link' : 'nav-link'" @click="goTo('courses')">
          <v-icon>mdi-book-open-outline</v-icon>
          <span class="link-name">Cours</span>
        </div>
      </div>
    </div>
    <div class="container-bottom-nav">
      <div class="nav-spacer"></div>
      <div class="container-name">
        <div class="avatar"></div>
        <span class="username">
          {{ user_data ? user_data.first_name : "" }}
          {{ user_data ? user_data.last_name : "" }}
        </span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "NavBar",
  props: {
    year: String,
    version: String,
    showNav: Boolean,
  },
  data() {
    return {
      windowHeight: "100vh",
      showSubMenu: false,
    };
  },
  computed: {
    ...mapState("user", ["user_data"]),
  },
  methods: {
    setWindowHeight() {
      this.windowHeight = "height: " + window.innerHeight + "px";
    },
    goTo(name: any) {
      this.$router.push({ name: name });
    },
  },
  created() {
    this.setWindowHeight();
    window.addEventListener("resize", () => {
      this.setWindowHeight();
    });
  },
});
</script>
