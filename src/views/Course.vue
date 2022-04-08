<template>
  <div class="page page-course">
    <BGlobalHeader backTitle="retour" @button-back-click="goBack()" center :title="module.name" />
    <b-global-card>
      <div class="container-header-course">
        <img class="image" src="https://img-c.udemycdn.com/course/240x135/602310_ec9f.jpg" alt="" />
        <div class="content">
          <div class="presentation-ligne">
            <p>Type:</p>
            <span class="chip-amber">{{ module.type }}</span>
          </div>
          <div class="presentation-ligne">
            <p>Durée:</p>
            <span class="chip-secondary-blue">5 heurs</span>
          </div>
          <div class="presentation-column">
            <p>Description:</p>
            <p class="description">{{ module.description }}</p>
          </div>
        </div>
      </div>
    </b-global-card>

    <pre>{{ courses }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as _ from "lodash";

// Components
import BGlobalHeader from "../components/global/headers/BGlobalHeader.vue";
import BGlobalCard from "../components/global/BGlobalCard.vue";

// Helpers
import { getModuleType } from "../helpers/courseHelper";
import { getDate, getHour } from "../helpers/dateHelper";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "course",
  components: { BGlobalHeader, BGlobalCard },
  data() {
    return {
      // Data
      module: {},
      courses: [],
    };
  },
  mounted() {
    this.getModule();
  },
  methods: {
    getDate,
    getModuleType,
    getHour,
    ...mapActions("snackbar", ["setSnackbarAction"]),

    async getModule() {
      //const start: any = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000);
      // Get module by id
      try {
        await this.$supabase
          .from("modules")
          .select("*")
          .eq("id", this.$route.params.id)
          .single()
          .then((res: any) => {
            this.module = res.data;
          });
      } catch (error) {
        console.log(error);
      }
      // Get all courses by id
      try {
        await this.$supabase
          .from("courses")
          .select("*")
          .eq("module", this.$route.params.id)
          .then((res: any) => {
            this.courses = res.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.push({ name: "courses" });
    },
  },
  computed: {
    ...mapState("user", ["user_data"]),
  },
});
</script>
