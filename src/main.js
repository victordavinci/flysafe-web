import Vue from "vue";
import VueFire from "vuefire";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");

Vue.config.productionTip = false;
Vue.use(VueFire);

var app;
var config = {
  apiKey: "AIzaSyAIfcF4g2UdZcrgsKAxxJ1odUoFL_o7LdQ",
  authDomain: "webapp-0.firebaseapp.com",
  databaseURL: "https://webapp-0.firebaseio.com",
  projectId: "webapp-0",
  storageBucket: "webapp-0.appspot.com",
  messagingSenderId: "174913995232"
};
var firebaseApp = firebase.initializeApp(config);
store.commit("setDb", firebaseApp.database());

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.commit("login", user);
  } else {
    store.commit("logout");
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
