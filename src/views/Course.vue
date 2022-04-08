<template>
  <div class="page">
    <BGlobalHeader backTitle="retour" center :title="module.name" />
    <pre>{{ module }}</pre>
    <pre>{{ courses }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as _ from "lodash";

// Components
import BGlobalHeader from "../components/global/headers/BGlobalHeader.vue";

// Helpers
import { getModuleType } from "../helpers/courseHelper";
import { getDate, getHour } from "../helpers/dateHelper";
import BButton from "../components/global/BButton.vue";
import { mapState, mapActions } from "vuex";
import BPopup from "../components/global/dialog/BPopup.vue";

export default Vue.extend({
  name: "course",
  components: { BGlobalHeader },
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
  },
  computed: {
    ...mapState("user", ["user_data"]),
  },
});
</script>
