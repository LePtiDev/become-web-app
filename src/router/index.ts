import Vue from "vue";
import VueRouter from "vue-router";
import { firebaseApp } from "../plugins/firebase";
import { User } from "../controller/user";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    // @ts-ignore
    component: () => import("@/views/Home.vue"),
    meta: {
      layout: false,
    },
  },

  /* User Session */
  {
    path: "/signup",
    name: "signup",
    // @ts-ignore
    component: () => import("@/views/SignUp.vue"),
    meta: {
      layout: false,
    },
  },
  {
    path: "/signin",
    name: "signin",
    // @ts-ignore
    component: () => import("@/views/SignIn.vue"),
    meta: {
      layout: false,
    },
  },

  /* Other */
  {
    path: "/dashboard",
    name: "dashboard",
    // @ts-ignore
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      layout: true,
      auth: true,
    },
  },
  {
    path: "/courses",
    name: "courses",
    // @ts-ignore
    component: () => import("@/views/Courses.vue"),
    meta: {
      layout: true,
      auth: true,
    },
  },
  {
    path: "/agenda",
    name: "agenda",
    // @ts-ignore
    component: () => import("@/views/Agenda.vue"),
    meta: {
      layout: true,
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach(async (to: any, from, next) => {
  firebaseApp.auth().onAuthStateChanged((userInfo) => {
    if (userInfo) {
      const user: any = new User();
      user.setUser(userInfo.uid);
      next();
    } else {
      if (to.meta.auth) {
        next({ name: "signin" });
      } else {
        next();
      }
    }
  });
});

export default router;
