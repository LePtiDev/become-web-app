<template>
  <div class="has-header page"></div>
</template>

<script lang="ts">
import Vue from "vue";
import * as _ from "lodash";

// Components
import BGlobalHeader from "../components/headers/BGlobalHeader.vue";

export default Vue.extend({
  name: "courses",
  components: { BGlobalHeader },
  methods: {},
});
</script>
