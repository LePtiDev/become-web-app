<template>
  <b-global-card class="login-card">
    <div class="container-login-logo">
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
                name="firstname"
                type="text"
                placeholder="Prénom"
                v-model="firstname"
                prepend-inner-icon="mdi-card-account-details-outline"
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
                name="name"
                type="text"
                placeholder="Nom"
                v-model="name"
                prepend-inner-icon="mdi-card-account-details-outline"
                outlined
            ></v-text-field>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-col-100">
          <div class="form-input-container">
            <span class="myc-input-label"
            >Email <span class="required-label">*</span></span
            >
            <v-text-field
                dense
                color="primary"
                name="user"
                type="email"
                placeholder="Email"
                v-model="email"
                prepend-inner-icon="mdi-at"
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

<script>
export default {
  name: "Signup",
  data() {
    return {
      showPassword: false,
      feedback: "",
      email: "",
      password: "",
      firstname: "",
      name: "",
    };
  },
  /////////////////////// TO DO ///////////////////////////
  methods: {
    submit() {
      alert('method sumbit à faire')
    }
  }
}
</script>

<style scoped>

</style>