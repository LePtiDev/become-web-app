<template>
  <b-global-card class="login-card">
    <div class="container-login-logo">
      <img width="200px" alt="Become" src="@/assets/logo.png" />
    </div>
    <v-form class="mb-4">
      <div class="form-row">
        <div class="form-col-100">
          <div class="form-input-container">
            <span class="myc-input-label"
              >Login <span class="required-label">*</span></span
            >
            <v-text-field
              dense
              color="primary"
              name="user"
              type="email"
              placeholder="email"
              v-model="email"
              prepend-inner-icon="mdi-account"
              outlined
            ></v-text-field>
          </div>
        </div>
      </div>
      <div class="form-row mb-4">
        <div class="form-col-100">
          <div class="form-input-container">
            <span class="myc-input-label"
              >Mot de passe <span class="required-label">*</span></span
            >
            <v-text-field
              color="primary"
              id="password"
              name="password"
              prepend-inner-icon="mdi-lock"
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
    <b-button class="mt-4" type="primary" title="connexion" @click="submit" />
  </b-global-card>
</template>

<script lang="ts">
import Vue from "vue";
import BButton from "@/components/BButton.vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "login",
  components: {
    BButton,
  },
  data() {
    return {
      showPassword: false,
      feedback: "",
      email: "",
      password: "",
    };
  },
  created() {
    this.user_data = {};
    this.$supabase.auth.signOut();
  },
  computed: {
    ...mapState("user", ["user_data"]),
  },
  methods: {
    ...mapActions("user", ["setUser"]),
    ...mapActions("snackbar", ["setSnackbarAction"]),

    async submit() {
      const { error, user } = await this.$supabase.auth.signIn({
        email: this.email,
        password: this.password,
      });
      if (user) {
        console.log(user);
        let get_data: any = await this.$supabase
          .from("users")
          .select()
          .eq("auth_id", user.id);
        this.setUser(get_data.data[0]);
        this.$router.push({ name: "dashboard" });
      } else {
        this.setSnackbarAction({
          status: true,
          type: "error",
          title: "Erreur",
          message: "Vos identifiants sont incorrect",
        });
      }
    },
  },
});
</script>
