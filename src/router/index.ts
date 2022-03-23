import Vue from "vue";
import VueRouter from "vue-router";
import { supabase } from '../supabase';

// State
import {user} from "@/store/modules/user.module";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      type: "home",
      showSideBar: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      type: "dashboard",
      requiresAuth: true,
      showSideBar: true,
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/Users.vue"),
    meta: {
      type: "user",
      requiresAuth: true,
      showSideBar: true,
    },
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import("@/views/Courses.vue"),
    meta: {
      type: "course",
      requiresAuth: true,
      showSideBar: true,
    },
  },

  /* Login */
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("@/views/SignIn.vue"),
    meta: {
      type: "login",
      showSideBar: false,
    },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("@/views/SignUp.vue"),
    meta: {
      type: "login",
      showSideBar: false,
    },
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach(async (to, from, next) => {
  let has_user: any = supabase.auth.user(); 
  if (to.matched.some((record) => {return record.meta.requiresAuth})) {
    if(has_user){
      let get_data: any = await supabase
      .from("users")
      .select()
      .eq("auth_id", has_user.id);
      user.state.user_data = get_data.data[0]
      next()
    }
    else{
      user.state.user_data = {}
      next({
          path: '/',
      })
    }
  }
  else {
    if(to.name == "home" && has_user){
      let get_data: any = await supabase
      .from("users")
      .select()
      .eq("auth_id", has_user.id);
      user.state.user_data = get_data.data[0]
      next()
    }
    else{
      user.state.user_data = {}
      next()
    }
  }
})

export default router;
