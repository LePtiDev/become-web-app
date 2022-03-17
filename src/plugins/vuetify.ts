import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  // treeShake: false,
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#3B82F6",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#E11D48",
        background: "#E3F3FF",
      },
    },
  },
});
