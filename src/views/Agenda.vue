<template>
  <div>
    <Bheader title="Agenda"/>
    <main>
      <div class="px-24">
        <BCard>
          <Bdatatable/>
        </BCard>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Bdatatable from "../components/Bdatatable.vue";
import Bheader from "../components/Bheader.vue";
import BCard from "../components/BCard.vue";

export default Vue.extend({
  components: {
    Bdatatable,
    BCard,
    Bheader
  }
});
</script>
