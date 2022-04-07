<template>
  <div class="container-content-home"></div>
</template>

<script lang="ts">
import Vue from "vue";
import BButton from "../components/global/BButton.vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: { BButton },
  name: "home",
  computed: {
    ...mapState("user", ["user_data"]),
  },
  methods: {
    goTo(name: String) {
      this.$router.push({ name: name });
    },
  },
});
</script>
