<template>
  <v-app class="container-app">
    <home-navbar/>
    <div
        class="container-page-login"
    >
      <router-view />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HomeNavbar from "../components/HomeNavBar.vue";
export default{
  components: {
    HomeNavbar
  },
  name: "Home"
}
</script>

<style scoped>

</style>