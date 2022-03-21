<template>
  <nav
      class="container-navbar-horizontal"
      :class="showNav ? 'nav-show-mobile' : ''"
      :style="windowWidth"
  >
    <div class="container-top-nav" :style="windowWidth">
      <div class="container-nav-logo">
        <img class="become-logo" alt="Myc" src="@/assets/logo.png" />
      </div>
      <div class="container-all-link">
        <div
            class="nav-link"
        >
          <b-button
              title="Login"
              iconsLeft="mdi-account-key-outline"
              @click="goTo('login')"
          />
        </div>
        <div
            class="nav-link"
        >
          <b-button
              title="Sign up"
              iconsLeft="mdi-account-plus-outline"
              type="secondary"
              @click="goTo('signup')"
          />
        </div>
        <!-- <div class="container-second-link">
          <div class="nav-second-link">
            <span class="link-name">Profile</span>
          </div>
        </div> -->
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import BButton from "./BButton.vue"
export default {
  name: "HomeNavBar",
  components: {
    BButton
  },
  props: {
    showNav: Boolean
  },
  data() {
    return {
      windowWidth: "100vw"
    }
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = "width: " + window.innerWidth + "px"
    },
    goTo(name: any) {
      this.$router.push({ name: name })
    },
  },
  created() {
    this.setWindowWidth()
    window.addEventListener("resize", () => {
      this.setWindowWidth()
    });
  }
}
</script>

<style scoped>

</style>