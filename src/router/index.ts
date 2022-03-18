import Vue from "vue";
import VueRouter from "vue-router";
import { supabase } from '../supabase';

// State
import {user} from "@/store/modules/user.module";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      type: "dashboard",
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/Users.vue"),
    meta: {
      type: "user",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      type: "login",
    },
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

/* router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => {return record.meta.requiresAuth})) {
    let has_user: any = supabase.auth.user();
    if(has_user){
      let get_data: any = await supabase
      .from("users")
      .select()
      .eq("auth_id", has_user.id);
      user.state.user_data = get_data.data[0]
      next()
    }
    else{
      next({
          path: '/login',
      })
    }
  }
  else {
    next()
  }
}) */

export default router;
