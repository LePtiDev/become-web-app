<template>
  <div class="relative">
    <label v-if="label" :for="name" class="block text-sm font-medium text-gray-700 relative">
      {{ label }} <span v-if="required"><sup>*</sup></span></label
    >
    <div class="relative" :class="label ? 'mt-1' : ''">
      <input
        :id="name"
        :name="name"
        :type="type"
        :autocomplete="autocomplete"
        :required="required"
        :placeholder="placeholder"
        :value="value"
        v-on:input="updateValue($event.target.value)"
        :class="{ 'border-red-300 text-red-900 placeholder-red-300 ': error }"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div v-if="error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <!-- Heroicon name: solid/exclamation-circle -->
        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-xs text-red-600 -bottom-5 right-0 absolute" id="email-error">{{ error[0] }}</p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    name: String,
    label: String,
    type: String,
    autocomplete: String,
    required: Boolean,
    placeholder: String,
    value: String,
    error: Array,
  },
  methods: {
    updateValue: function (value: any) {
      this.$emit("input", value);
    },
  },
});
</script>
