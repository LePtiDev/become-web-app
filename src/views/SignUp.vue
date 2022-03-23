<template>
  <b-global-card class="sign-up-card">
    <div class="container-sign-up-logo">
      <img width="200px" alt="Become" src="@/assets/logo.png" />
    </div>
    <v-form class="mb-4">
      <div class="form-row">
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label"
              >Prénom <span class="required-label">*</span></span
            >
            <v-text-field
              dense
              color="primary"
              name="user"
              type="text"
              placeholder="Marie"
              v-model="first_name"
              outlined
            ></v-text-field>
          </div>
        </div>
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label"
              >Nom <span class="required-label">*</span></span
            >
            <v-text-field
              dense
              color="primary"
              name="user"
              type="text"
              placeholder="Dupont"
              v-model="last_name"
              outlined
            ></v-text-field>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label"
              >Email <span class="required-label">*</span></span
            >
            <v-text-field
              dense
              color="primary"
              name="user"
              type="email"
              placeholder="email"
              v-model="email"
              outlined
            ></v-text-field>
          </div>
        </div>
        <div class="form-col-50">
          <div class="form-input-container">
            <span class="myc-input-label"
              >Mot de passe <span class="required-label">*</span></span
            >
            <v-text-field
              color="primary"
              id="password"
              name="password"
              placeholder="Mot de passe"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              dense
              outlined
              required
              appen
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </div>
        </div>
      </div>
    </v-form>

    <div class="ml-8 mb-4">
      <div>
        <v-label v-if="feedback" class="justify-center">
          <span class="red--text">{{ feedback }}</span>
        </v-label>
      </div>
    </div>
    <b-button class="mt-4" type="primary" title="Inscription" @click="submit" />
  </b-global-card>
</template>

<script lang="ts">
import Vue from "vue";
import BButton from "@/components/BButton.vue";
import BGlobalCard from "@/components/BGlobalCard.vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "login",
  components: {
    BButton,
    BGlobalCard,
  },
  data() {
    return {
      showPassword: false,
      feedback: "",
      email: "",
      password: "",
      last_name: "",
      first_name: "",
    };
  },
  created() {
    this.$supabase.auth.signOut();
  },
  computed: {
    ...mapState("user", ["user_data"]),
  },
  methods: {
    ...mapActions("user", ["setUser"]),
    ...mapActions("snackbar", ["setSnackbarAction"]),

    async submit() {
      const { error, user } = await this.$supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });
      if (user) {
        const { data } = await this.$supabase.from("users").insert([
          {
            first_name: this.first_name,
            last_name: this.last_name,
            auth_id: user.id,
            role: "USER",
          },
        ]);
        if (data) {
          this.$router.push({ name: "dashboard" });
        } else {
          this.setSnackbarAction({
            status: true,
            type: "error",
            title: "Error",
            message: "Les informations remplie sont incorrect",
          });
        }
      } else {
        this.setSnackbarAction({
          status: true,
          type: "error",
          title: "Error",
          message: "Les identifiants existe déjà",
        });
      }
    },
  },
});
</script>
