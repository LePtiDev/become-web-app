<template>
  <div>
    <transition name="snackbar">
      <div class="myc-snackbar" v-if="settings.status">
        <div class="snackbar-icon" :class="'snackbar-icon-' + settings.type">
          <v-icon v-if="settings.type === 'success'" size="24">mdi-check-circle-outline</v-icon>
          <v-icon v-if="settings.type === 'error'" size="24">mdi-alert-circle-outline</v-icon>
        </div>
        <div class="snackbar-content">
          <h4 v-if="settings.title">{{ settings.title }}</h4>
          <p>{{ settings.message }}</p>
        </div>
        <div v-if="!settings.primaryFunction" class="snackbar-close" @click="closeSnasckbar()">
          <v-icon size="24">mdi-close</v-icon>
        </div>
        <b-button v-else type="primary" :title="$t('global.update')" @click="doPrimaryAndClose()" />
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
import BButton from "@/components/global/BButton.vue";
export default Vue.extend({
  name: "myc-snackbar",
  components: {
    BButton,
  },
  props: {
    settings: {
      type: Object,
    },
  },
  methods: {
    ...mapActions("snackbar", ["setSnackbarAction"]),
    closeSnasckbar() {
      this.setSnackbarAction({
        status: false,
      });
    },
    doPrimaryAndClose() {
      this.settings.primaryFunction();
      this.closeSnasckbar();
    },
  },
  watch: {
    settings: function () {
      if (this.settings.status) {
        if (this.settings.timeout != "none") {
          setTimeout(() => {
            this.closeSnasckbar();
          }, this.settings.timeout);
        }
      }
    },
  },
});
</script>
