import firebaseConfig from "../config/firebase";
import firebase, { app } from "firebase/app";
import "firebase/firestore";

// Firebase dependencies
import "firebase/database";
import "firebase/auth";

import Vue from "vue";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);

Vue.prototype.$db = db;
Vue.prototype.$fb = firebaseApp;

export { firebaseApp, db };
