<template>
  <nav
    class="container-navbar"
    :class="showNav ? 'nav-show-mobile' : ''"
    :style="windowHeight"
  >
    <div class="container-top-nav">
      <div class="container-nav-logo">
        <img class="become-logo" alt="Myc" src="@/assets/logo.png" />
      </div>
      <div class="container-all-link">
        <div
          :class="
            $route.meta.type == 'user' ? 'link-active nav-link' : 'nav-link'
          "
          @click="goTo('users')"
        >
          <v-icon>mdi-account-multiple-outline</v-icon>
          <span class="link-name">Utilisateurs</span>
        </div>
        <div
          :class="
            $route.meta.type == 'dashboard'
              ? 'link-active nav-link'
              : 'nav-link'
          "
          @click="goTo('dashboard')"
        >
          <v-icon>mdi-chart-box-outline</v-icon>
          <span class="link-name">Dashboard</span>
        </div>
          <div
          :class="
            $route.meta.type == 'classes'
              ? 'link-active nav-link'
              : 'nav-link'
          "
          @click="goTo('classes')"
        >
          <v-icon>mdi-chart-box-outline</v-icon>
          <span class="link-name">Cours</span>
        </div>
        <!-- <div class="container-second-link">
          <div class="nav-second-link">
            <span class="link-name">Profile</span>
          </div>
        </div> -->
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
      <!--       <v-menu
        content-class="tool-menu"
        v-model="showSubMenu"
        :close-on-content-click="true"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on }"> </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="logout()"
              >Deconnection</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu> -->
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
    ...mapActions("user", ["setUser"]),
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
