<template>
  <div class="myc-global-header">
    <MycButton
      v-if="backTitle"
      @click="returnTo()"
      type="terciary"
      iconsLeft="mdi-chevron-left"
      :title="backTitle"
    />
    <h2 v-if="title">{{ title }}</h2>
    <div v-if="primaryButton" class="container-buttons">
      <slot name="info"></slot>
      <MycButton
        v-if="secondaryButton"
        type="secondary"
        :iconsLeft="secondaryIcon ? 'mdi-' + secondaryIcon : ''"
        @click="secondaryClick"
        :title="secondaryButton"
      />
      <v-menu v-if="ButtonOptions" content-class="header-tool-menu" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <MycButton
              :iconsLeft="'mdi-' + primaryIcon"
              :title="primaryButton"
            />
          </div>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in ButtonOptions" :key="index">
            <v-list-item-title
              style="cursor: pointer"
              @click="selectClick(item.value)"
            >
              <v-icon v-if="item.icon != ''">mdi-{{ item.icon }}</v-icon>
              <span>{{ item.label }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <MycButton
        v-else
        @click="primaryClick"
        :iconsLeft="'mdi-' + primaryIcon"
        :title="primaryButton"
        :type="disabled ? 'disable' : 'primary'"
      />
    </div>
    <div v-if="center" style="width: 100px"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "myc-global-header",
  props: {
    center: {
      type: Boolean,
    },
    backTitle: {
      type: String,
    },
    title: {
      type: String,
    },

    // Button primary
    primaryButton: {
      type: String,
    },
    ButtonOptions: {
      type: Array,
    },
    primaryIcon: {
      type: String,
      default: "plus",
    },

    // Button secondary
    secondaryButton: {
      type: String,
    },
    secondaryIcon: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    returnTo() {
      this.$emit("back-click");
    },
    primaryClick() {
      this.$emit("button-primary-click");
    },
    secondaryClick() {
      this.$emit("button-secondary-click");
    },
    selectClick(value: any) {
      this.$emit("select-click", value);
    },
  },
});
</script>
