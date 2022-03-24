<template>
  <div class="has-header page">
    <BGlobalHeader title="Cours" :primaryButton="user_data.role == 'SUPER_ADMIN' || user_data.role == 'ADMIN' ? 'Ajouter un cours' : ''" @button-primary-click="courseDialog = true" />
    <b-global-card title="Cours d'aujourd'hui">
      <!--       <template v-slot:headerButton>
        <v-text-field class="search" prepend-inner-icon="mdi-magnify" hide-details placeholder="Chercher" v-model="search" type="text" dense outlined required></v-text-field>
      </template> -->
      <v-data-table
        :loading="loading"
        class="table-normal myc-pagination btn-datatable"
        :headers="Headers"
        :header-props="headerProps"
        :items="dayCourses"
        item-key="key"
        mobile-breakpoint="0"
        multi-sort
        :footer-props="{
          'items-per-page-options': [10, 30, 50, 100, 200],
        }"
        :items-per-page="10"
      >
        <template v-slot:[`item.module.type`]="{ item }">
          <span :class="getModuleType(item.module.type)">{{ item.module.type }}</span>
        </template>
        <template v-slot:[`item.module.name`]="{ item }">
          <span class="chip-blue">{{ item.module.name }}</span>
        </template>
        <template v-slot:[`item.level`]="{ item }">
          <span class="chip-red">Niveau {{ item.level }}</span>
        </template>
        <template v-slot:[`item.date`]="{ item }">
          <span>{{ getDate(item.start_at) }}</span>
        </template>
        <template v-slot:[`item.start_at`]="{ item }">
          <span>{{ getHour(item.start_at) }}</span>
        </template>
        <template v-slot:[`item.end_at`]="{ item }">
          <span>{{ getHour(item.end_at) }}</span>
        </template>
        <template v-slot:[`item.video_link`]="{ item }">
          <b-button v-if="item.video_link" @click="openClick(item.video_link)" small title="rejoindre" />
          <b-button v-else type="disable" small title="Pas de lien" />
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <v-btn color="primary" icon @click="openCourseDialog(item.id)"><v-icon small color="#DADADA">mdi-pencil-outline</v-icon></v-btn>
          <v-btn color="primary" icon @click="openDeleteCourseDialog(item.id)"><v-icon small color="#DADADA">mdi-delete-outline</v-icon></v-btn>
        </template>
      </v-data-table>
    </b-global-card>
    <b-global-card title="Cours de demain">
      <v-data-table
        :loading="loading"
        class="table-normal myc-pagination btn-datatable"
        :headers="Headers"
        :header-props="headerProps"
        :items="nextDayCourses"
        item-key="key"
        mobile-breakpoint="0"
        multi-sort
        :footer-props="{
          'items-per-page-options': [10, 30, 50, 100, 200],
        }"
        :items-per-page="10"
      >
        <template v-slot:[`item.module.type`]="{ item }">
          <span :class="getModuleType(item.module.type)">{{ item.module.type }}</span>
        </template>
        <template v-slot:[`item.module.name`]="{ item }">
          <span class="chip-blue">{{ item.module.name }}</span>
        </template>
        <template v-slot:[`item.level`]="{ item }">
          <span class="chip-red">Niveau {{ item.level }}</span>
        </template>
        <template v-slot:[`item.date`]="{ item }">
          <span>{{ getDate(item.start_at) }}</span>
        </template>
        <template v-slot:[`item.start_at`]="{ item }">
          <span>{{ getHour(item.start_at) }}</span>
        </template>
        <template v-slot:[`item.end_at`]="{ item }">
          <span>{{ getHour(item.end_at) }}</span>
        </template>
        <template v-slot:[`item.video_link`]="{ item }">
          <b-button v-if="item.video_link" @click="openClick(item.video_link)" small title="rejoindre" />
          <b-button v-else type="disable" small title="Pas de lien" />
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <v-btn color="primary" icon @click="openCourseDialog(item.id)"><v-icon small color="#DADADA">mdi-pencil-outline</v-icon></v-btn>
          <v-btn color="primary" icon @click="openDeleteCourseDialog(item.id)"><v-icon small color="#DADADA">mdi-delete-outline</v-icon></v-btn>
        </template>
      </v-data-table>
    </b-global-card>
    <b-global-card title="Cours de la semaine">
      <v-data-table
        :loading="loading"
        class="table-normal myc-pagination btn-datatable"
        :headers="Headers"
        :header-props="headerProps"
        :items="weekCourses"
        item-key="key"
        mobile-breakpoint="0"
        multi-sort
        :footer-props="{
          'items-per-page-options': [10, 30, 50, 100, 200],
        }"
        :items-per-page="10"
      >
        <template v-slot:[`item.module.type`]="{ item }">
          <span :class="getModuleType(item.module.type)">{{ item.module.type }}</span>
        </template>
        <template v-slot:[`item.module.name`]="{ item }">
          <span class="chip-blue">{{ item.module.name }}</span>
        </template>
        <template v-slot:[`item.level`]="{ item }">
          <span class="chip-red">Niveau {{ item.level }}</span>
        </template>
        <template v-slot:[`item.date`]="{ item }">
          <span>{{ getDate(item.start_at) }}</span>
        </template>
        <template v-slot:[`item.start_at`]="{ item }">
          <span>{{ getHour(item.start_at) }}</span>
        </template>
        <template v-slot:[`item.end_at`]="{ item }">
          <span>{{ getHour(item.end_at) }}</span>
        </template>
        <template v-slot:[`item.video_link`]="{ item }">
          <b-button v-if="item.video_link" @click="openClick(item.video_link)" small title="rejoindre" />
          <b-button v-else type="disable" small title="Pas de lien" />
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <v-btn color="primary" icon @click="openCourseDialog(item.id)"><v-icon small color="#DADADA">mdi-pencil-outline</v-icon></v-btn>
          <v-btn color="primary" icon @click="openDeleteCourseDialog(item.id)"><v-icon small color="#DADADA">mdi-delete-outline</v-icon></v-btn>
        </template>
      </v-data-table>
    </b-global-card>

    <!-- Dialog -->
    <b-course-dialog :courseId="courseId" v-if="courseDialog" @reload="closeCourseDialogue(true)" @close="closeCourseDialogue"></b-course-dialog>
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
import BCourseDialog from "../components/dialog/BCourseDialog.vue";
import BPopup from "../components/global/dialog/BPopup.vue";

export default Vue.extend({
  name: "courses",
  components: { BGlobalHeader, BButton, BCourseDialog, BPopup },
  data() {
    return {
      // Table
      loading: false,
      headerProps: {
        "sort-icon": "mdi-unfold-more-horizontal",
      },

      // Data
      dayCourses: [],
      nextDayCourses: [],
      weekCourses: [],

      // Dialog
      courseDialog: false,
      courseId: null,
      deleteCourseDialog: false,
      deletecourseId: null,
    };
  },
  mounted() {
    this.getDayCourses();
    this.getNextDayCourses();
    this.getWeekCourses();
  },
  methods: {
    getDate,
    getModuleType,
    getHour,
    ...mapActions("snackbar", ["setSnackbarAction"]),
    openDeleteCourseDialog(id: any) {
      this.deletecourseId = id;
      this.deleteCourseDialog = true;
    },
    async deleteCourse() {
      const { data, error } = await this.$supabase.from("courses").delete().match({ id: this.deletecourseId });
      if (data) {
        this.deleteCourseDialog = false;
        this.getDayCourses();
        this.getNextDayCourses();
        this.getWeekCourses();
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
        this.getDayCourses();
        this.getNextDayCourses();
        this.getWeekCourses();
      }
    },
    openClick(link: any) {
      window.open(link, "_blank");
    },
    async getDayCourses() {
      const start: any = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000);
      const end: any = Math.floor(new Date(new Date().setHours(24, 0, 0, 0)).getTime() / 1000);

      const { data, error } = await this.$supabase.from("courses").select("*, module(*)").gte("start_at", start).lte("start_at", end);
      if (data) {
        this.dayCourses = data;
      } else {
        console.log(error);
      }
    },
    async getNextDayCourses() {
      const start: any = Math.floor(new Date(new Date().setHours(24, 0, 1, 0)).getTime() / 1000);
      const end: any = Math.floor(new Date(new Date().setHours(48, 0, 0, 0)).getTime() / 1000);

      const { data, error } = await this.$supabase.from("courses").select("*, module(*)").gte("start_at", start).lte("start_at", end);
      if (data) {
        this.nextDayCourses = data;
      } else {
        console.log(error);
      }
    },
    async getWeekCourses() {
      var curr = new Date(); // get current date
      var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6

      const start: any = Math.floor(new Date(new Date(curr.setDate(first)).setHours(24, 0, 0, 0)).getTime() / 1000);
      const end: any = Math.floor(new Date(new Date(curr.setDate(last)).setHours(48, 0, 0, 0)).getTime() / 1000);

      const { data, error } = await this.$supabase.from("courses").select("*, module(*)").gte("start_at", start).lte("start_at", end);
      if (data) {
        this.weekCourses = data;
      } else {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState("user", ["user_data"]),
    Headers() {
      let computedHeaders = [
        {
          text: "Type",
          value: "module.type",
          align: "start",
        },
        {
          text: "Module",
          value: "module.name",
          align: "start",
        },
        {
          text: "Intervenant",
          value: "teacher",
          align: "start",
        },
        {
          text: "Niveau",
          value: "level",
          align: "start",
        },
        {
          text: "Description",
          value: "description",
          align: "start",
        },
        {
          text: "Date",
          value: "date",
          align: "start",
        },
        {
          text: "Début",
          value: "start_at",
          align: "start",
        },
        {
          text: "Termine",
          value: "end_at",
          align: "start",
        },
        {
          text: "Lien",
          value: "video_link",
          align: "start",
        },
      ];
      if (this.user_data.role == "SUPER_ADMIN" || this.user_data.role == "ADMIN") {
        computedHeaders.push({
          text: "Action",
          value: "id",
          align: "start",
        });
      }
      return computedHeaders;
    },
  },
});
</script>
