<template>
  <div
    class="myc-card-global"
    @click="expandCheck($event)"
    :class="[
      flat ? '' : 'shadow-base',
      hideMargin ? 'myc-card-global-no-margin' : '',
      disabled && !show ? 'myc-card-global-disabled' : '',
      expand ? 'pointer closed-myc-card-global' : '',
      !show ? 'closed-myc-card-global' : '',
    ]"
  >
    <div v-if="title" class="header-card-global">
      <div class="container-title-left">
        <div v-if="title" class="title-card">
          <v-icon v-if="icon != ``" :color="iconColor">{{ icon }}</v-icon> {{ title }}
        </div>
        <div class="button-card">
          <slot name="headerButton"></slot>
        </div>
      </div>
      <div v-if="expand" class="container-expand">
        <v-icon :class="show ? `icon-expand` : ``">mdi-chevron-down</v-icon>
      </div>
    </div>
    <div v-if="show" class="card-content" :class="padding ? 'card-content-padding' : ''">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    expand: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    hideMargin: {
      default: false,
      type: Boolean,
    },
    title: {
      default: "",
      type: String,
    },
    flat: {
      default: false,
      type: Boolean,
    },
    padding: {
      default: false,
      type: Boolean,
    },
    defaultExpand: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: ``,
      type: String,
    },
    iconColor: {
      default: ``,
      type: String,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    expandCheck(event: any) {
      if (this.expand) {
        if (event.target.nodeName === "INPUT") {
          this.show = true;
        } else {
          if (event.target.className) {
            let classCliked: any = event.target.className.split(" ");
            if (classCliked.includes("container-title-left") || classCliked.includes("title-card") || classCliked.includes("icon-expand") || classCliked.includes("header-card-global")) {
              this.show = !this.show;
            } else {
              this.show = true;
            }
          } else {
            this.show = true;
          }
        }
      }
    },
  },
  created() {
    if (this.expand) this.show = this.defaultExpand;
  },
});
</script>
