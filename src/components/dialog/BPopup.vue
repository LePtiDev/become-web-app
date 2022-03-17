<template>
  <div>
    <MycGlobalDialog
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
        <MycIcon :iconType="iconType" :name="iconName" />
        <div class="dialog-popup-title">
          {{ title }}
        </div>
        <div class="dialog-popup-text">
          <slot name="text"></slot>
        </div>
      </div>
      <div v-if="deletionPopUp" class="dialog-popup">
        <v-form ref="form" v-model="valid">
          <div class="form-row mt-4">
            <div class="form-input-container">
              <span class="myc-input-label"
                >{{ $t(`global.reason`)
                }}<span class="required-label">*</span></span
              >
              <v-select
                dense
                outlined
                width="auto"
                :items="reasonsList"
                v-model="reasonDeletion"
                append-icon="mdi-unfold-more-horizontal"
                required
                :rules="basicRule"
                class="mt-2"
              ></v-select>
            </div>
          </div>
        </v-form>
      </div>
    </MycGlobalDialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import MycGlobalDialog from "@/components/global/dialog/MycGlobalDialog.vue";

export default Vue.extend({
  name: "MycPopUp",
  components: {
    MycGlobalDialog,
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
      default: i18n.t(`global.yes`),
    },
    secondaryButton: {
      type: String,
      default: i18n.t("global.no"),
    },
  },
  methods: {
    primaryClicked() {
      this.$emit("primaryClicked", this.reasonDeletion);
    },
    secondaryClicked() {
      this.$emit("secondaryClicked");
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isReady = true;
    });
  },
});
</script>
