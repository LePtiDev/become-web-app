<template>
  <div class="has-header page">
    <b-global-header
      title="Utilisateurs"
      primaryButton="Ajouter"
      @button-primary-click="dialogUser = true"
    />
    <b-global-card title="Utilisateurs">
      <template v-slot:headerButton>
        <v-text-field
          class="search"
          prepend-inner-icon="mdi-magnify"
          hide-details
          placeholder="Chercher"
          v-model="search"
          type="text"
          dense
          outlined
          required
        ></v-text-field>
      </template>
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
        <template v-slot:[`item.id`]="{ item }">
          <v-btn color="primary" icon @click="deleteUser(item.id)">
            <v-icon small color="#DADADA">mdi-delete-outline</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </b-global-card>
    <b-global-dialog
      v-if="dialogUser"
      title="Ajouter un utilisateur"
      @close="dialogUser = false"
      @background-click="dialogUser = false"
      primaryButton="Ajouter"
      @primary-click="AddUser()"
      secondaryButton="Annuler"
      @secondary-click="dialog = false"
    >
      <v-form class="container-form-layout" ref="userForm" lazy-validation>
        <div class="form-row">
          <!-- First Name -->
          <div class="form-col-50">
            <div class="form-input-container">
              <span class="myc-input-label">
                Prénom
                <span class="required-label">*</span></span
              >
              <v-text-field
                placeholder="Marine"
                v-model="newUser.first_name"
                dense
                name="first_name"
                outlined
                required
                hide-details
                :rules="basicRule"
              ></v-text-field>
            </div>
          </div>
          <!-- Last Name -->
          <div class="form-col-50">
            <div class="form-input-container">
              <span class="myc-input-label">
                Nom
                <span class="required-label">*</span></span
              >
              <v-text-field
                placeholder="Dupont"
                v-model="newUser.last_name"
                dense
                name="last_name"
                outlined
                required
                hide-details
                :rules="basicRule"
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="form-row">
          <!-- Email -->
          <div class="form-col-50">
            <div class="form-input-container">
              <span class="myc-input-label">
                Email
                <span class="required-label">*</span></span
              >
              <v-text-field
                placeholder="Marine.dupont@mail.com"
                v-model="newUser.email"
                dense
                name="email"
                outlined
                required
                hide-details
                :rules="basicRule"
              ></v-text-field>
            </div>
          </div>
          <!-- Last Name -->
          <div class="form-col-50">
            <div class="form-input-container">
              <span class="myc-input-label">
                Mot de passe
                <span class="required-label">*</span></span
              >
              <v-text-field
                placeholder="**********"
                v-model="newUser.password"
                dense
                name="password"
                outlined
                required
                hide-details
                :rules="basicRule"
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="form-row">
          <!-- Rôle -->
          <div class="form-col-50">
            <div class="form-input-container">
              <span class="myc-input-label">
                Rôle
                <span class="required-label">*</span></span
              >
              <v-select
                placeholder="Administrateur"
                required
                dense
                name="role"
                outlined
                hide-details
                width="auto"
                :rules="basicRule"
                :items="roleList"
                v-model="newUser.role"
                append-icon="mdi-unfold-more-horizontal"
              ></v-select>
            </div>
          </div>
        </div>
      </v-form>
    </b-global-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as _ from "lodash";

// Components
import BGlobalCard from "../components/BGlobalCard.vue";
import BGlobalHeader from "../components/headers/BGlobalHeader.vue";
import BGlobalDialog from "../components/dialog/BGlobalDialog.vue";

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
          value: "id",
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
    async AddUser() {
      if (this.$refs.userForm.validate()) {
        const { data: user, error } = await this.$supabase.auth.api.createUser({
          email: this.newUser.email,
          password: this.newUser.password,
        });
        if (user) {
          const { data, error } = await this.$supabase.from("users").insert([
            {
              first_name: this.newUser.first_name,
              last_name: this.newUser.last_name,
              auth_id: user.id,
              role: this.newUser.role,
            },
          ]);
          this.dialogUser = false;
          this.setSnackbarAction({
            status: true,
            type: "success",
            title: "Nouveau utilisateur",
            message: "L'utilisateur à bien été créé",
          });
          this.loadData();
        } else {
          console.log("auth", error);
        }
      } else {
        const errors: any = [];
        this.$refs.userForm.inputs.forEach((e) => {
          if (e.errorBucket && e.errorBucket.length) {
            errors.push(...e.errorBucket);
          }
        });
        this.setSnackbarAction({
          status: true,
          type: "error",
          title: "Erreur",
          message: errors[0],
        });
      }
    },
    EditUser(id: any) {},
    deleteUser(id: any) {},
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
