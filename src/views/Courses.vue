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
        <BCard class="mb-6 w-1/4" v-for="course in courses" :key="course.title" :title="course.title" :teacher="course.teacher" :image="course.image">
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
  data() {
    return {
      courses: [
        {
          title: "Node.js Nest",
          teacher: "Alexandre ZERAH",
          image: "https://courses.nestjs.com/img/nest-courses-og.png",
        },
        {
          title: "Laravel",
          teacher: "Pierre GRIMAUD",
          image: "https://oursblanc.tech/wp-content/uploads/2020/12/logolaravel-e1607524036663.png",
        },
        {
          title: "Initiation Vue.js V3",
          teacher: "Alexis BOUGY",
          image: "https://vuejsdevelopers.com/images/posts/vue_3_tutorial.png",
        },
      ],
    };
  },
});
</script>
