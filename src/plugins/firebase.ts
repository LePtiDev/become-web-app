import firebaseConfig from "../config/firebase";
import firebase, { app } from "firebase/app";

// Firebase dependencies
import "firebase/database";
import "firebase/auth";

import Vue from "vue";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

Vue.prototype.$db = db;
Vue.prototype.$fb = firebaseApp;

export { firebaseApp, db };
