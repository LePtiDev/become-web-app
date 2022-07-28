<template>
  <div class="">
    <header class="">
      <div class="px-24 py-4">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="px-24">
        <BCard title="hello">
          <template v-slot:header-right>coucou</template>
        </BCard>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BCard from "../components/BCard.vue";

export default Vue.extend({
  components: { BCard },
});
</script>
