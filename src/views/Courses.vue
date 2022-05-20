<template>
  <div class="">
    <Bheader title="Welcome back !">
      <template v-slot:rightNav>
        <Bbutton type="secondary">
          Voir mes cours
        </Bbutton>
      </template>
    </Bheader>
    <main>
      <div class="px-24 flex justify-between">
        <BCard title="Node.js Socket.io" />
        <BCard title="Node.js Socket.io" />
        <BCard title="Node.js Socket.io" />
        <BCard title="Node.js Socket.io" />
        <BCard title="Node.js Socket.io" />
        <BCard title="Node.js Socket.io" />
        <BCard title="Node.js Socket.io" />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Bheader from "./../components/Bheader.vue";
import BCard from "./../components/BCard.vue";
import Bbutton from "./../components/Bbutton.vue";
import Vue from "vue";
export default Vue.extend({

});
</script>
