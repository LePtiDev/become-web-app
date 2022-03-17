<template>
  <div class="has-header page">
    <b-global-header title="Utilisateurs" />
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
      </v-data-table>
    </b-global-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BGlobalCard from "../components/BGlobalCard.vue";
import BGlobalHeader from "../components/headers/BGlobalHeader.vue";
import * as _ from "lodash";

// DB
import { getAllUsers } from "../controller/users";

export default Vue.extend({
  name: "HomeAdmin",
  components: { BGlobalHeader, BGlobalCard },
  data() {
    return {
      users: [],
      filteredUsers: [],
      search: "",
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
          text: "Action",
          align: "center",
          sortable: false,
        },
      ];
      return computedHeaders;
    },
  },
  methods: {
    async loadData() {
      let data: any = await getAllUsers();
      this.users = data;
    },
    EditUser() {},
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
