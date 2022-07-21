<template>
  <div>
    <Bheader title="Agenda"/>
    <main>
      <div class="px-24">
        <BCard title="Cours d'aujourd'hui">
          <Bdatatable edit :header="header" :data="getAllCoursesInAgenda"/>
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
  },
  computed: {
    getAllCoursesInAgenda() {
      return this.$store.getters.getCoursesInAgenda;
    },
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
        {
          name: "Professeur",
          value: "teacher"
        }
      ]
    }
  }
});
</script>
