import Vue from "vue";
import Vuex from "vuex";

// Modules
import { snackbar } from "./modules/snackbar.module";
import { user } from "./modules/user.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    snackbar,
    user,
  },
});
