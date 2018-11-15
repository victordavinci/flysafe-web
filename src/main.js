import Vue from "vue";
import VueFire from "vuefire";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faClipboardList,
  faDownload,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as VueGoogleMaps from "vue2-google-maps";

import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

library.add(faLock, faAndroid, faClipboardList, faDownload, faFileAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAIfcF4g2UdZcrgsKAxxJ1odUoFL_o7LdQ"
  }
});

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
store.commit("setStorage", firebase.storage());

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (!user.emailVerified) {
      if (store.state.pending.indexOf(user.email) < 0) {
        user
          .sendEmailVerification()
          .then(function() {
            store.commit("addPendingVerification", user.email);
            alert(
              "Se ha enviado un email de verificación a su casilla de correo"
            );
            firebase.auth().signOut();
          })
          .error(function() {
            alert("No se ha podido enviar el email de verificación");
            firebase.auth().signOut();
          });
      }
    } else {
      store.commit("login", user);
      if ((localStorage.getItem("location") || "/") === "/") {
        router.push("/reportes");
      }
    }
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
