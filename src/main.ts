import Vue from 'vue';
import App from './App.vue';

// API
import store from "./store";
import axios from 'axios'
import strapi from 'strapi'
import vueAxios from 'vue-axios'
import { supabase } from './supabase';

// Addons
import router from "./router";
import vuetify from "./plugins/vuetify";


// SCSS
import "@/scss/init.scss";

// Global variable 
Vue.prototype.$supabase = supabase

Vue.use(vueAxios, axios)

let app: any = null;
app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
});

app.$mount("#app");
