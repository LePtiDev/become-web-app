<template>
  <b-global-dialog title="Créer un module" @close="close" primaryButton="Ajouter" secondaryButton="Annuler" @secondary-click="close" @primary-click="submit()">
    <form>
      <div class="form-row">
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Type <span class="required-label">*</span></span>
            <v-combobox v-model="module.type" placeholder="Type du module" :items="allModules" dense outlined solo append-icon="mdi-unfold-more-horizontal"></v-combobox>
          </div>
        </div>
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label">Name <span class="required-label">*</span></span>
            <v-text-field dense color="primary" name="name" type="text" placeholder="Vue.js" v-model="module.name" outlined></v-text-field>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-col-100">
          <div class="form-input-container">
            <span class="myc-input-label">Description <span class="required-label">*</span></span>
            <v-text-field dense color="primary" name="description" type="description" placeholder="Ce que le module permet de valider" v-model="module.description" outlined></v-text-field>
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
import { cloneDeep } from "lodash";
import { mapActions } from "vuex";

export default Vue.extend({
  components: { BGlobalDialog },
  props: {
    courseId: Number,
  },
  data() {
    return {
      module: {
        name: "",
        description: "",
      },
      allModules: [],
    };
  },
  mounted() {
    this.getAllModules();
  },
  methods: {
    ...mapActions("snackbar", ["setSnackbarAction"]),
    close() {
      this.$emit("close");
    },
    async getAllModules() {
      const { data } = await this.$supabase.from("modules").select();
      data.forEach((element: any) => {
        if (!this.allModules.find((name) => name === element.type)) {
          this.allModules.push(element.type);
        }
      });
    },
    async submit() {
      const { error, data } = await this.$supabase.from("modules").insert([this.module]);
      if (data) {
        this.$emit("close");
        this.setSnackbarAction({
          status: true,
          type: "success",
          title: "Créé",
          message: "Votre module à été créé",
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
  },
});
</script>
