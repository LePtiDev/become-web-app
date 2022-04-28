import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import "./plugins/firebase";

// API
import store from "./store";

// Addons
import router from "./router";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(VueCompositionAPI);

// SCSS
import "@/scss/init.scss";
import "@/scss/plugins/tailwind.css";

let app: any = null;
app = new Vue({
  router,
  store,
  render: (h: any) => h(App),
});

app.$mount("#app");
