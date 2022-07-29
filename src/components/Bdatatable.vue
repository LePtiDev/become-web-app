<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full py-1 px-1 align-middle">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th :key="prop.name" v-for="prop in header" scope="col" class="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">{{prop.name}}</th>
                <th v-if="edit" scope="col" class="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr :key="row.id" v-for="row in data">
                <td :key="row.id + '-' + prop.name" v-for="prop in header" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row[prop.value]}}</td>
                <td v-if="edit" class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                  <a href="#" @click="removeCourse(row)" class="text-indigo-600 hover:text-indigo-900">Supprimer</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    header: Array,
    data: Array,
    edit: Boolean,
  },
  methods: {
    removeCourse(course: Object): void {
      this.$store.dispatch("removeCourseInAgenda", course);
    }
  }
});
</script>