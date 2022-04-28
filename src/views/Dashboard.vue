<template>
  <div>Coucou vous etes bien sur le {{ test }}</div>
</template>
<script lang="ts">
import Vue from "vue";
import Bbutton from "../components/Bbutton.vue";
import Binput from "../components/Binput.vue";
export default Vue.extend({
  components: { Binput },
  data() {
    return {
      test: "",
    };
  },
});
</script>
