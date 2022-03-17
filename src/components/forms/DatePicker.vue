<template>
  <div class="formulate-input-element formulate-input-element--text">
    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" style="min-width: auto !important" transition="scale-transition" offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-text-field v-model="dateFormatted" prepend-icon="mdi-calendar" style="width: auto !important" placeholder="01-01-1990" readonly v-bind="attrs" v-on="on"></v-text-field>
      </template>
      <v-date-picker ref="picker" style="min-width: 100% !important" v-model="date" :max="max" :min="min" @change="save"></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {displayBirthdDate} from "@/_helpers/tools/dateHelper";

export default Vue.extend({
  name: "DatePicker",
  props: {
    standardFormat: {
      type: Boolean,
      required: false,
    },
    context: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      date: "",
      menu: false,
      dateFormatted: "",
      max: new Date().toISOString().substr(0, 10),
      min: "1940-01-01",
    };
  },
  watch: {
    context(val) {
      this.actualizeDateFormatted();
    },
    menu(val) {
      val && setTimeout(() => ((this.$refs.picker as any).activePicker = this.standardFormat ? "DATE" : "YEAR"));
    },
  },
  methods: {
    save(date: any) {
      this.dateFormatted = this.displayBirthdDate(date);

      const refMenu: any = this.$refs.menu;
      refMenu?.save(date);
      // eslint-disable-next-line vue/no-mutating-props
      this.context.model = date;
    },
    actualizeDateFormatted() {
      (this.date as any) = this.context.model;
      this.dateFormatted = this.displayBirthdDate(this.date);
    },
    displayBirthdDate(date: any) {
      return displayBirthdDate(date, this.$i18n.locale);
    },
  },
  created() {
    if (this.standardFormat) {
      this.max = "";
      this.min = new Date().toISOString().substr(0, 10);
    }
    this.actualizeDateFormatted();
  },
});
</script>
