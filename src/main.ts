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

// Directive
Vue.directive("click-outside", {
  bind(el: any, binding: any, vnode: any) {
    el.clickOutsideEvent = (event: any) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

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
