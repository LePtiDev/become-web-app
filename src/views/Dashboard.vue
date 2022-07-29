<template>
  <div class="">
    <header class="">
      <div class="px-24 py-4">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="px-24">
        <div v-if="getAllCoursesInAgenda.length === 0">
          <p>Vous n'avez pas de cours dans votre agenda</p>
        </div>
        <div v-else>
          <h1>Votre prochain cours</h1>
          <BCard class="mb-6 w-1/4 cursor-pointer" :name="lastLesson.name" :teacher="lastLesson.teacher" :image="lastLesson.image">
            <template v-slot:header-right>
              <p>{{ lastLesson.teacher }}</p>
            </template>
          </BCard>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BCard from "../components/BCard.vue";

export default Vue.extend({
  components: { BCard },
  data() {
    return {
      lastLesson: {
        id: 0,
        name: "",
        teacher: "",
        image: "",
      },
    };
  },
  computed: {
    getAllCoursesInAgenda() {
      return this.$store.getters.getCoursesInAgenda;
    },
  },
  mounted() {
    this.$set(this.$data, "lastLesson", this.getAllCoursesInAgenda[0]);
  },
});
</script>
