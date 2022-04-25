import Vue from "vue";
import App from "./App.vue";
import "./plugins/firebase";

// API
import store from "./store";

// Addons
import router from "./router";

// SCSS
import "@/scss/init.scss";

// Global variable

let app: any = null;
app = new Vue({
  router,
  store,
  render: (h: any) => h(App),
});

app.$mount("#app");
