<template>
  <div>
    <Bheader title="Agenda"/>
    <main>
      <div class="px-24">
        <BCard title="Cours d'aujourd'hui">
          <Bdatatable edit :header="header" :data="courses"/>
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
  data(){
    return {
      courses: [
        {
          id: "1",
          name: "Node.js",
          module: "développeur"
        }
      ]
    }
  },
  components: {
    Bdatatable,
    BCard,
    Bheader
  },
  computed: {
    header(){
      return [
        {
          name: "Module",
          value: "module"
        },
        {
          name: "Nom",
          value: "name"
        },
      ]
    }
  }
});
</script>
