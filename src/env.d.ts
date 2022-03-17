/// <reference types="vite/client" />
import Vue from "vue";

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue/types/vue' {
    interface Vue {
        $supabase: any
    }
}