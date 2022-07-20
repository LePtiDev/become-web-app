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
      <div class="px-24 flex flex-wrap justify-between">
        <BCard class="mb-6 w-1/4" v-for="course in getCourses" :key="course.id" :title="course.title" :teacher="course.teacher" :image="course.image">
          <template v-slot:header-right>
            <p>{{ course.teacher }}</p>
          </template>
        </BCard>
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
  computed: {
    getCourses() {
      return this.$store.getters.getAllCourses;
    }
  }
});
</script>
