<template>
  <div class="">
    <Bheader title="Welcome back !">
      <template v-slot:rightNav>
        <Bbutton type="secondary">
          Voir mes cours
        </Bbutton>
      </template>
    </Bheader>
  </div>
</template>
<script lang="ts">
import Bheader from "./../components/Bheader.vue";
import Bbutton from "./../components/Bbutton.vue";
import Vue from "vue";
export default Vue.extend({

});
</script>
