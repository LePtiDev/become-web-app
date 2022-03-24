<template>
  <div>
    <BGlobalDialog
      :background="false"
      :cross="false"
      :hasHeader="false"
      :primaryButton="primaryButton"
      @primary-click="primaryClicked()"
      :secondaryButton="secondaryButton"
      @secondary-click="secondaryClicked()"
      :hasCenterButton="true"
      :primaryButtonType="type"
      v-if="isReady"
    >
      <div class="dialog-popup">
        <v-icon>mdi-alert</v-icon>
        <div class="dialog-popup-title">
          {{ title }}
        </div>
        <div class="dialog-popup-text">
          <slot name="text"></slot>
        </div>
      </div>
    </BGlobalDialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BGlobalDialog from "@/components/global/dialog/BGlobalDialog.vue";

export default Vue.extend({
  name: "MycPopUp",
  components: {
    BGlobalDialog,
  },
  data() {
    return {
      isReady: false,
      reasonDeletion: "no_show",
      valid: true,
    };
  },
  props: {
    text: {
      type: String,
      default: "It's a content",
    },
    title: {
      type: String,
      default: "It's a title",
    },
    type: {
      type: String,
      default: "error",
    },
    primaryButtonType: {
      type: String,
      default: "error",
    },
    deletionPopUp: {
      type: Boolean,
      default: false,
    },
    iconType: String,
    iconName: String,
    primaryButton: {
      type: String,
      default: "Oui",
    },
    secondaryButton: {
      type: String,
      default: "Non",
    },
  },
  methods: {
    primaryClicked() {
      this.$emit("primary-click");
    },
    secondaryClicked() {
      this.$emit("secondary-click");
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isReady = true;
    });
  },
});
</script>
