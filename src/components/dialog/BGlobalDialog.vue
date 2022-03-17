<template>
  <div class="myc-dialog-global-container">
    <div @click="backgroundClick" class="dialog-global-background"></div>
    <div class="dialog-global" :style="width ? 'width: ' + width + 'px' : ''">
      <div v-if="hasHeader" ref="dialogHeader" class="dialog-header" :class="scrollHeaderClass">
        <div class="title-close">
          <div class="dialog-title">{{ title ? title : "" }}</div>
          <v-icon v-if="cross" @click="close" class="pointer">mdi-close</v-icon>
        </div>
        <p v-if="subTitle">{{ subTitle }}</p>
      </div>
      <div ref="dialogContent" :class="background ? 'background-content-dialog' : ''" class="dialog-content" :style="'max-height: ' + getMaxHeight() + 'px'">
        <slot />
      </div>
      <div v-if="primaryButton || secondaryButton" ref="dialogFooter" :class="scrollFooterClass" class="dialog-footer">
        <div class="container-footer" :class="{centerButton: hasCenterButton}">
          <div class="dialog-error">
            <div v-if="errors.length > 0" class="dialog-message-error">
              <v-icon>mdi-alert-circle-outline</v-icon>
              <p>{{ $t("global.the_field") + " " + $t("global." + errors[0].name) + " " + errors[0].error }}</p>
            </div>
          </div>
          <MycButton v-if="secondaryButton" :type="secondaryButtonType" :title="secondaryButton" class="ml-4" @click="secondaryClick"></MycButton>
          <MycButton v-if="primaryButton" :title="primaryButton" :type="primaryButtonType" class="ml-4" @click="primaryClick" :finished="finished"></MycButton>
        </div>
      </div>
      <div v-else class="dialog-no-footer"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import MycButton from "@/components/global/buttons/MycButton.vue";

export default Vue.extend({
  components: {
    MycButton,
  },
  data() {
    return {
      windowHeight: 0,
      scrollHeaderClass: "",
      scrollFooterClass: "",
      errors: [],
    };
  },
  props: {
    title: String,
    subTitle: String,
    primaryButton: String,
    secondaryButton: String,
    form: Object,
    width: Number,
    hasCenterButton: {
      type: Boolean,
      default: false,
    },
    primaryButtonType: {
      type: String,
      default: "primary",
    },
    secondaryButtonType: {
      type: String,
      default: "secondary",
    },
    hasHeader: {
      type: Boolean,
      default: true,
    },
    cross: {
      type: Boolean,
      default: true,
    },
    background: {
      type: Boolean,
      default: true,
    },
    finished: Boolean,
  },
  mounted() {
    // Variables
    this.windowHeight = window.innerHeight;
    let body: any = this.$refs?.["dialogContent"];

    // Dimension of window
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
      this.getFooterShadow(this.getMaxHeight(), body.offsetHeight);
    });

    // Get Header Shadow
    body?.addEventListener("scroll", (event: any) => {
      if (body.scrollTop > 10) {
        this.scrollHeaderClass = "shadow-base";
      } else {
        this.scrollHeaderClass = "";
      }
    });

    // Get Footer Shadow
    this.getFooterShadow(this.getMaxHeight(), body.offsetHeight);
  },
  methods: {
    getMaxHeight() {
      let footer: any = this.$refs?.["dialogFooter"];
      let header: any = this.$refs?.["dialogHeader"];
      // window height - headerheight - margin - footer
      let totalWindow = this.windowHeight - 32;
      if (footer?.offsetHeight != undefined) totalWindow = totalWindow - footer?.offsetHeight;
      if (header?.offsetHeight != undefined) totalWindow = totalWindow - header?.offsetHeight;
      return totalWindow;
    },
    getFooterShadow(maxHeight: number, bodyHeight: number) {
      if (maxHeight < bodyHeight) {
        this.scrollFooterClass = "shadow-base-invert";
      } else {
        this.scrollFooterClass = "";
      }
    },
    primaryClick() {
      if (this.form) {
        this.errors = [];

        // Check the form
        const isFormUserValid = (
          this.form as Vue & {
            validate: () => boolean;
          }
        ).validate();

        // Add errros
        (this.errors as any) = getErrors(this.form);

        // Emit only if is validate
        if (isFormUserValid) {
          this.$emit("primary-click");
        }
      } else {
        this.$emit("primary-click");
      }
    },
    secondaryClick() {
      this.$emit("secondary-click");
    },
    close() {
      this.$emit("close");
    },
    backgroundClick() {
      this.$emit("background-click");
    },
  },
});
</script>
