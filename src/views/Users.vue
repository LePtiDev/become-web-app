<template>
  <div class="has-header page">
    <b-global-header title="Utilisateurs" />
    <b-global-card title="Utilisateurs">
      <v-data-table
        :loading="loading"
        class="table-normal myc-pagination btn-datatable"
        :headers="headers"
        :header-props="headerProps"
        :items="users"
        item-key="key"
        :search-input.sync="search"
        mobile-breakpoint="0"
        multi-sort
        @click:row="EditUser"
        :footer-props="{
          'items-per-page-options': [10, 30, 50, 100, 200],
        }"
        :items-per-page="10"
      >
        <template v-slot:[`item.role`]="{ item }">
          <span :class="getRoleColor(item.role)">{{ getRole(item.role) }}</span>
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          {{ getFullDate(item.updated_at) }}
        </template>
        <template v-slot:[`item.auth_id`]="{ item }">
          <v-btn color="primary" icon @click="deleteUser(item)"> <v-icon small color="#DADADA">mdi-delete-outline</v-icon></v-btn>
        </template>
      </v-data-table>
    </b-global-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as _ from "lodash";

// Components
import BGlobalCard from "../components/global/BGlobalCard.vue";
import BGlobalHeader from "../components/global/headers/BGlobalHeader.vue";
import BGlobalDialog from "../components/global/dialog/BGlobalDialog.vue";

// Helpers
import { getFullDate } from "../helpers/dateHelper";
import { mapActions } from "vuex";

// DB
import { getAllUsers } from "../controller/users";

// Rules
import { requiredRule } from "../helpers/rulesHelper";
import { user } from "../store/modules/user.module";

export default Vue.extend({
  name: "HomeAdmin",
  components: { BGlobalHeader, BGlobalCard, BGlobalDialog },
  data() {
    return {
      // Form
      basicRule: [requiredRule()],
      newUser: {},
      roleList: [
        {
          value: "SUPER_ADMIN",
          text: "Super administrateur",
        },
        {
          value: "ADMIN",
          text: "Administrateur",
        },
        {
          value: "USER",
          text: "Utilisateur",
        },
      ],

      // Tables
      users: [],
      filteredUsers: [],
      search: "",

      dialogUser: false,
      headerProps: {
        "sort-icon": "mdi-unfold-more-horizontal",
      },
      loading: false,
    };
  },
  computed: {
    headers() {
      let computedHeaders = [
        {
          text: "Prénom",
          value: "first_name",
          align: "start",
        },
        {
          text: "Nom",
          value: "last_name",
          align: "start",
        },
        {
          text: "Rôle",
          value: "role",
          align: "start",
        },
        {
          text: "Mise à jour",
          value: "updated_at",
          align: "start",
        },
        {
          text: "Action",
          align: "center",
          value: "auth_id",
          sortable: false,
        },
      ];
      return computedHeaders;
    },
  },
  methods: {
    ...mapActions("snackbar", ["setSnackbarAction"]),
    getFullDate,
    async loadData() {
      let data: any = await getAllUsers();
      this.users = data;
    },
    EditUser(id: any) {},
    async deleteUser(userData: any) {
      if (userData.role === "SUPER_ADMIN") {
        this.setSnackbarAction({
          status: true,
          type: "error",
          title: "Impossible de supprimer",
          message: "L'utilisateur est super administrateur",
        });
      } else {
        const { data: user, error } = await this.$supabase.auth.api.deleteUser(userData.auth_id);
        if (user) {
          const { data, error } = await this.$supabase.from("users").delete().match({ auth_id: userData.auth_id });
          if (data) {
            this.setSnackbarAction({
              status: true,
              type: "success",
              title: "Succès",
              message: "Utilisateur supprimé",
            });
          } else {
            this.setSnackbarAction({
              status: true,
              type: "error",
              title: "Erreur",
              message: "Une erreur est survenu",
            });
          }
        }
      }
    },
    getRole(role: any) {
      if (role == "SUPER_ADMIN") {
        return "Super administrateur";
      } else if (role == "ADMIN") {
        return "Administrateur";
      } else {
        return "Utilisateur";
      }
    },
    getRoleColor(role: any) {
      if (role == "SUPER_ADMIN") {
        return "chip-red";
      } else if (role == "ADMIN") {
        return "chip-amber";
      } else {
        return "chip-green";
      }
    },
  },
  created() {
    this.loadData();
  },
});
</script>
