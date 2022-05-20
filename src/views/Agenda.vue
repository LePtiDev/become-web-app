<template>
  <div class="">
    <header class="">
      <div class="px-24 py-4">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">Agenda</h1>
      </div>
    </header>
    <main>
      <div class="px-24">
        <Bdatatable/>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Bdatatable from "../components/Bdatatable.vue";

export default Vue.extend({
  components: {
    Bdatatable,
  }
});
</script>
