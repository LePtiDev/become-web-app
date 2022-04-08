<template>
  <div class="page">
    <BGlobalHeader
      title="Cours"
      :primaryButton="user_data.role == 'SUPER_ADMIN' || user_data.role == 'ADMIN' ? 'Ajouter' : ''"
      @select-click="openDialogByValue($event)"
      :ButtonOptions="ButtonOptions"
    />
    <v-data-iterator :items="modules">
      <template v-slot:default="props">
        <div class="container-course-card">
          <b-global-card
            :class="(index + 1) % 4 === 0 ? 'course-card-end' : 'course-card'"
            :key="'module-id-' + module.id"
            v-for="(module, index) in props.items"
            :title="module.name"
            @click="goToCourse(module.id)"
          >
            <template v-slot:headerButton>
              <span class="chip-amber">{{ module.type }}</span>
            </template>
            <img src="https://img-c.udemycdn.com/course/240x135/602310_ec9f.jpg" alt="" />
            <p>{{ module.description }}</p>
          </b-global-card>
        </div>
      </template>
    </v-data-iterator>

    <!-- Dialog -->
    <b-course-dialog :courseId="courseId" v-if="courseDialog" @reload="closeCourseDialogue(true)" @close="closeCourseDialogue"></b-course-dialog>
    <b-module-dialog v-if="moduleDialog" @reload="closeCourseDialogue(true)" @close="moduleDialog = false"></b-module-dialog>
    <b-popup v-if="deleteCourseDialog" type="error" title="Attention" @primary-click="deleteCourse" @secondary-click="deleteCourseDialog = false">
      <template v-slot:text>
        <p>Voulez vous vraiment supprimer ce cours ?</p>
      </template>
    </b-popup>
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
import BCourseDialog from "@/components/content-dialog/BCourseDialog.vue";
import BModuleDialog from "@/components/content-dialog/BModuleDialog.vue";
import BPopup from "../components/global/dialog/BPopup.vue";

export default Vue.extend({
  name: "courses",
  components: { BGlobalHeader, BButton, BCourseDialog, BModuleDialog, BPopup },
  data() {
    return {
      // Table
      loading: false,
      headerProps: {
        "sort-icon": "mdi-unfold-more-horizontal",
      },

      // Data
      modules: [],
      ButtonOptions: [
        { label: "Ajouter un module", value: "module", icon: "book-education-outline" },
        { label: "Ajouter un cours", value: "course", icon: "book-open-outline" },
      ],

      // Dialog
      courseDialog: false,
      courseId: null,
      // ---
      deleteCourseDialog: false,
      deletecourseId: null,
      // ---
      moduleDialog: false,
    };
  },
  mounted() {
    this.getModules();
  },
  methods: {
    getDate,
    getModuleType,
    getHour,
    ...mapActions("snackbar", ["setSnackbarAction"]),

    goToCourse(id: string) {
      this.$router.push({ name: "course", params: { id: id } });
    },
    openDialogByValue(value: any) {
      if (value == "course") {
        this.courseDialog = true;
      } else if (value == "module") {
        this.moduleDialog = true;
      }
    },
    openDeleteCourseDialog(id: any) {
      this.deletecourseId = id;
      this.deleteCourseDialog = true;
    },
    async deleteCourse() {
      const { data, error } = await this.$supabase.from("courses").delete().match({ id: this.deletecourseId });
      if (data) {
        this.deleteCourseDialog = false;
        this.getModules();
        this.setSnackbarAction({
          status: true,
          type: "success",
          title: "Supprimé",
          message: "Votre cours à été supprimé",
        });
      } else {
        this.setSnackbarAction({
          status: true,
          type: "error",
          title: "Erreur",
          message: error,
        });
      }
    },
    openCourseDialog(id: any) {
      this.courseId = id;
      this.courseDialog = true;
    },
    closeCourseDialogue(reload?: Boolean) {
      this.courseId = null;
      this.courseDialog = false;
      if (reload) {
        this.getModules();
      }
    },
    openClick(link: any) {
      window.open(link, "_blank");
    },
    async getModules() {
      const { data, error } = await this.$supabase.from("modules").select("*");
      if (data) {
        this.modules = data;
      } else {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState("user", ["user_data"]),
  },
});
</script>
