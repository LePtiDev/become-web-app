import Vue from 'vue';
import App from './App.vue';

// Addons
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { supabase } from './supabase';

// SCSS
import "@/scss/init.scss";

// Global variable 
Vue.prototype.$supabase = supabase

let app: any = null;
app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
});

app.$mount("#app");
