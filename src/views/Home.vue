<template>
  <div class="container-content">
    <nav class="container-home-navbar">
      <img class="logo" alt="Become" src="@/assets/logo.png" />
      <b-button v-if="user_data.role" title="Mon tableau de bord" @click="goTo('dashboard')" type="secondary" />
      <div v-else class="container-button">
        <b-button title="S'inscrire" @click="goTo('sign-up')" />
        <b-button title="Se connecter" type="secondary" @click="goTo('sign-in')" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BButton from "../components/global/BButton.vue";
import {mapState} from "vuex";

export default Vue.extend({
  components: {BButton},
  name: "home",
  computed: {
    ...mapState("user", ["user_data"]),
  },
  methods: {
    goTo(name: String) {
      this.$router.push({name: name});
    },
  },
});
</script>
