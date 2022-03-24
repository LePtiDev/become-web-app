<template>
  <b-global-dialog
    :title="courseId ? 'Modifier le cours' : 'Créer un cour'"
    @close="close"
    :primaryButton="courseId ? 'Modifier' : 'Ajouter'"
    secondaryButton="Annuler"
    @secondary-click="close"
    @primary-click="submit()"
  >
    <form>
      <div class="form-row">
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Module <span class="required-label">*</span></span>
            <v-select
              dense
              outlined
              width="auto"
              :hint="`${modules.name}, ${modules.id}`"
              item-text="name"
              item-value="id"
              :items="modules"
              v-model="course.module"
              append-icon="mdi-unfold-more-horizontal"
              placeholder="Vue.js"
              required
            ></v-select>
          </div>
        </div>
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Intervenant <span class="required-label">*</span></span>
            <v-text-field dense color="primary" name="name" type="text" placeholder="email" v-model="course.teacher" outlined></v-text-field>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Début du cour <span class="required-label">*</span></span>
            <v-text-field dense color="primary" name="name" :value="start_at" type="datetime-local" placeholder="email" v-model="start_at" outlined></v-text-field>
          </div>
        </div>
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Fin du cour<span class="required-label">*</span></span>
            <v-text-field dense color="primary" name="name" type="datetime-local" :value="end_at" placeholder="email" v-model="end_at" outlined></v-text-field>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-col-100">
          <div class="form-input-container">
            <span class="myc-input-label">Description <span class="required-label">*</span></span>
            <v-text-field dense color="primary" name="descritpion" type="text" placeholder="Description" v-model="course.description" outlined></v-text-field>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Lien vidéo</span>
            <v-text-field dense color="primary" name="video_link" type="text" placeholder="https://mon-lien.com" v-model="course.video_link" outlined></v-text-field>
          </div>
        </div>
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Niveau <span class="required-label">*</span></span>
            <v-text-field dense color="primary" name="level" type="text" placeholder="1" v-model="course.level" outlined></v-text-field>
          </div>
        </div>
      </div>
    </form>
  </b-global-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import BGlobalDialog from "../global/dialog/BGlobalDialog.vue";

// Helpers
import { getFormatInputDate, getHour } from "../../helpers/dateHelper";
import { cloneDeep } from "lodash";
import { mapActions } from "vuex";

export default Vue.extend({
  components: { BGlobalDialog },
  props: {
    courseId: Number,
  },
  data() {
    return {
      course: {
        conversation: undefined,
        created_at: undefined,
        description: undefined,
        end_at: undefined,
        files: undefined,
        level: undefined,
        module: undefined,
        start_at: undefined,
        teacher: undefined,
        video_link: undefined,
      },
      modules: [],
      start_at: new String(),
      end_at: new String(),
      test: undefined,
    };
  },
  mounted() {
    if (this.courseId) {
      this.getCourse();
    }
    this.getModules();
  },
  methods: {
    ...mapActions("snackbar", ["setSnackbarAction"]),
    getFormatInputDate,
    getHour,
    close() {
      this.$emit("close");
    },
    async getCourse() {
      const { data, error } = await this.$supabase.from("courses").select("*, module(*)").match({ id: this.courseId }).single();
      if (data) {
        this.course = data;
        this.start_at = getFormatInputDate(data.start_at);
        this.end_at = getFormatInputDate(data.end_at);
      } else {
        console.log(error);
      }
    },
    async getModules() {
      const { data, error } = await this.$supabase.from("modules").select();
      if (data) {
        this.modules = data;
      } else {
        console.log(error);
      }
    },
    async submit() {
      if (this.courseId) {
        let course: any = cloneDeep(this.course);
        course.module = typeof course.module === "object" ? course.module.id : course.module;
        course.start_at = new Date(this.start_at).getTime() / 1000;
        course.end_at = new Date(this.end_at).getTime() / 1000;
        const { data, error } = await this.$supabase.from("courses").update(course).match({ id: this.courseId });
        if (data) {
          this.$emit("reload");
          this.setSnackbarAction({
            status: true,
            type: "success",
            title: "Modifié",
            message: "Votre cours à été modifié",
          });
        } else {
          this.setSnackbarAction({
            status: true,
            type: "error",
            title: "Erreur",
            message: error,
          });
        }
      } else {
        let course: any = cloneDeep(this.course);
        course.start_at = new Date(this.start_at).getTime() / 1000;
        course.end_at = new Date(this.end_at).getTime() / 1000;
        const { data, error } = await this.$supabase.from("courses").insert([course]);
        if (data) {
          this.$emit("reload");
          this.setSnackbarAction({
            status: true,
            type: "success",
            title: "Ajouté",
            message: "Votre cours à été ajouté",
          });
        } else {
          this.setSnackbarAction({
            status: true,
            type: "error",
            title: "Erreur",
            message: error,
          });
        }
      }
    },
  },
});
</script>
